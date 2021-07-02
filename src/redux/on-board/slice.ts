import { createSlice } from '@reduxjs/toolkit';

const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState: { finish: false },
  reducers: {
    finishOnBoard: (state, action) => {
      state.finish = true;
    },
  },
});

export const { finishOnBoard } = onBoardSlice.actions;
export const onBoardReducer = onBoardSlice.reducer;
