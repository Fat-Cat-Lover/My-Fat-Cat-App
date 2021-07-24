import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loadingState',
  initialState: {
    requests: 0,
  },
  reducers: {
    requestStart: (state, action) => {
      state.requests += 1;
    },
    requestEnd: (state, action) => {
      state.requests -= 1;
    },
  },
});

export const { requestStart, requestEnd } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
