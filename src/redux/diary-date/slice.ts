import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const diaryDateSlice = createSlice({
  name: 'diaryDate',
  initialState: {
    value: dayjs().toISOString(),
  },
  reducers: {
    setDiaryDate: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setDiaryDate } = diaryDateSlice.actions;
export const diaryDateResucer = diaryDateSlice.reducer;
