import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkOnboard as _checkOnboard, onBoardFinish } from 'services/check-onboard';

interface onBoardInitialState {
  finish?: boolean;
}

const initState: onBoardInitialState = {
  finish: undefined,
};

export const checkOnboard = createAsyncThunk<boolean>('onBoard/check-onboard', async () => await _checkOnboard());

export const finishOnboard = createAsyncThunk('onBoard/fin-onboard', async () => await onBoardFinish());

const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkOnboard.fulfilled, (state, action) => {
      state.finish = action.payload;
    });
    builder.addCase(finishOnboard.fulfilled, state => {
      state.finish = true;
    });
  },
});

export const onBoardReducer = onBoardSlice.reducer;
