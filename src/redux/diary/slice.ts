import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Diary } from 'models/diary';
import { getDiary } from 'services/diary';

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
  },
});

export const diaryReducer = DiarySlice.reducer;
