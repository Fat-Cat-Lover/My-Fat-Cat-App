import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { CatFood } from 'models/cat-food';
import { DailyMemo, EatingRecord } from 'models/diary';
import { requestEnd, requestStart } from 'redux/loading/slice';
import { addRecord, getDiary, addExerciseTime as _addExerciseTime, editRecord, deleteRecord } from 'services/diary';

interface CurrentDiary {
  status: 'idle' | 'loading' | 'success' | 'failed';
  currentDiary: { records: EatingRecord[]; excerciseTime: number; diaryDate: string; memo?: DailyMemo } | null;
}

const initState: CurrentDiary = {
  status: 'idle',
  currentDiary: null,
};

export const getCurrentDiary = createAsyncThunk<
  { records: EatingRecord[]; excerciseTime: number; diaryDate: string },
  { catId: number; date: Date }
>('diary/getCurrentDiary', async (args, thunkApi) => {
  thunkApi.dispatch(requestStart({}));
  const diary = await getDiary(args.catId, args.date);
  thunkApi.dispatch(requestEnd({}));
  return diary;
});

export const addEatingRecord = createAsyncThunk<
  any,
  { catId: number; foodType: string; brand: string; food: CatFood; weight: number; time: Date }
>('diary/addEatingRecord', async (args, thunkApi) => {
  thunkApi.dispatch(requestStart({}));
  const record = await addRecord(args.catId, args.foodType, args.brand, args.food, args.weight, args.time);
  thunkApi.dispatch(requestEnd({}));
  return record;
});

export const editEatingRecord = createAsyncThunk<
  any,
  { recordId: number; time: Date; foodType: string; brand: string; food: CatFood; weight: number }
>('diary/editEatingRecord', async (args, thunkApi) => {
  thunkApi.dispatch(requestStart({}));
  const record = await editRecord(args.recordId, args.time, args.foodType, args.brand, args.food, args.weight);
  thunkApi.dispatch(requestEnd({}));
  return record;
});

export const deleteEatingRecord = createAsyncThunk<any, number>('diary/deleteEatingRecord', async (args, thunkApi) => {
  thunkApi.dispatch(requestStart({}));
  await deleteRecord(args);
  thunkApi.dispatch(requestEnd({}));
});

export const addExerciseTime = createAsyncThunk<
  { createdTime: string; exerciseTime: number },
  { catId: number; createdTime: Date; exerciseTime: number }
>('diary/addExerciseTime', async (args, thunkApi) => {
  thunkApi.dispatch(requestStart({}));
  await _addExerciseTime(args.catId, args.createdTime, args.exerciseTime);
  thunkApi.dispatch(requestEnd({}));
  return { createdTime: args.createdTime.toISOString(), exerciseTime: args.exerciseTime };
});

const DiarySlice = createSlice({
  name: 'diary',
  initialState: initState,
  reducers: {
    addMemo: (state, action) => {
      if (state.currentDiary) {
        state.currentDiary.memo = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getCurrentDiary.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCurrentDiary.fulfilled, (state, action) => {
      state.currentDiary = action.payload;
      state.status = 'success';
    });
    builder.addCase(addEatingRecord.fulfilled, (state, action) => {
      if (dayjs(state.currentDiary?.diaryDate).isSame(action.payload.createdTime, 'day')) {
        state.currentDiary?.records.push(action.payload);
      }
    });
    builder.addCase(addExerciseTime.fulfilled, (state, action) => {
      if (dayjs(state.currentDiary?.diaryDate).isSame(action.payload.createdTime, 'day')) {
        state.currentDiary!.excerciseTime += action.payload.exerciseTime;
      }
    });
    builder.addCase(editEatingRecord.fulfilled, (state, action) => {
      if (dayjs(state.currentDiary?.diaryDate).isSame(action.payload.createdTime, 'day')) {
        const index = state.currentDiary!.records.findIndex(record => record.id === action.payload.id);
        state.currentDiary!.records[index] = action.payload;
      }
    });
    builder.addCase(deleteEatingRecord.fulfilled, (state, action) => {
      if (dayjs(state.currentDiary?.diaryDate).isSame(action.payload.createdTime, 'day')) {
        const index = state.currentDiary!.records.findIndex(record => record.id === action.payload.id);
        state.currentDiary!.records.splice(index, 1);
      }
    });
  },
});

export const { addMemo } = DiarySlice.actions;
export const diaryReducer = DiarySlice.reducer;
