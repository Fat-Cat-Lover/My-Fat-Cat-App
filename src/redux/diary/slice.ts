import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { classToPlain } from 'class-transformer';
import { Diary } from 'models/diary';

interface CurrentDiary {
  currentDiary: Record<keyof Diary, any> | null;
}
const initState: CurrentDiary = {
  currentDiary: null,
};

const DiarySlice = createSlice({
  name: 'diary',
  initialState: initState,
  reducers: {
    setCurrentDiary: {
      reducer: (state, action: PayloadAction<Record<keyof Diary, any>>) => {
        state.currentDiary = action.payload;
      },
      prepare: diary => {
        return { payload: classToPlain(diary) };
      },
    },
  },
});

export const { setCurrentDiary } = DiarySlice.actions;
export const diaryReducer = DiarySlice.reducer;
