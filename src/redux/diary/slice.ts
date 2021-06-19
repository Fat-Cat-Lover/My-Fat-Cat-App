import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Diary } from 'models/diary';
import { EatingRecord } from 'models/eating-record';
import { getDiary } from 'services/diary';
import { addRecord } from 'services/eating-record';

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
  },
});

export const diaryReducer = DiarySlice.reducer;
