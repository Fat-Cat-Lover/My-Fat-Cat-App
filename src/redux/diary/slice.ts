import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Diary } from 'models/diary';
import { getDiary } from 'services/diary';

interface CurrentDiary {
  currentDiary: Diary | null;
}
const initState: CurrentDiary = {
  currentDiary: null,
};

export const getCurrentDiary = createAsyncThunk<Diary, { catID: number; date: Date }>(
  'diary/getCurrentDiary',
  async args => await getDiary(args.catID, args.date)
);

const DiarySlice = createSlice({
  name: 'diary',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrentDiary.fulfilled, (state, action) => {
      state.currentDiary = action.payload;
    });
  },
});

export const diaryReducer = DiarySlice.reducer;
