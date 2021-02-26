import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const diaryDateSlice = createSlice({
  name: 'diaryDate',
  initialState: {
    value: dayjs().unix(),
  },
  reducers: {
    setDiaryDate: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setDiaryDate } = diaryDateSlice.actions;
export const diaryDateResucer = diaryDateSlice.reducer;
