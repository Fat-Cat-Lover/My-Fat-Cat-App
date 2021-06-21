import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Diary, EatingRecord } from 'models/diary';
import { addRecord, getDiary, addExerciseTime as _addExerciseTime } from 'services/diary';

interface CurrentDiary {
  status: 'idle' | 'loading' | 'success' | 'failed';
  currentDiary: Diary | null;
}

const initState: CurrentDiary = {
  status: 'idle',
  currentDiary: null,
};

export const getCurrentDiary = createAsyncThunk<Diary, { catId: number; date: Date }>(
  'diary/getCurrentDiary',
  async args => await getDiary(args.catId, args.date)
);

export const addEatingRecord = createAsyncThunk<
  EatingRecord,
  { catId: number; foodId: number; weight: number; time: Date }
>('diary/addEatingRecord', async args => await addRecord(args.catId, args.foodId, args.weight, args.time));

export const addExerciseTime = createAsyncThunk<
  { createdTime: string; exerciseTime: number },
  { catId: number; createdTime: Date; exerciseTime: number }
>('diary/addExerciseTime', async args => {
  await _addExerciseTime(args.catId, args.createdTime, args.exerciseTime);
  return { createdTime: args.createdTime.toISOString(), exerciseTime: args.exerciseTime };
});

const DiarySlice = createSlice({
  name: 'diary',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrentDiary.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCurrentDiary.fulfilled, (state, action) => {
      state.currentDiary = action.payload;
      state.status = 'success';
    });
    builder.addCase(addEatingRecord.fulfilled, (state, action) => {
      if (dayjs(state.currentDiary?.records[0]?.createdTime).isSame(action.payload.createdTime, 'day')) {
        state.currentDiary?.records.push(action.payload);
      }
    });
    builder.addCase(addExerciseTime.fulfilled, (state, action) => {
      if (dayjs(state.currentDiary?.records[0]?.createdTime).isSame(action.payload.createdTime, 'day')) {
        state.currentDiary!.excerciseTime += action.payload.exerciseTime;
      }
    });
  },
});

export const diaryReducer = DiarySlice.reducer;
