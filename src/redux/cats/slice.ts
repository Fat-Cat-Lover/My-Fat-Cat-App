import { createSlice } from '@reduxjs/toolkit';
import { Cat } from 'models/cat';

interface CatsState {
  cats: Cat[];
  selectedCat: number;
}

const initState: CatsState = {
  cats: [],
  selectedCat: 0,
};

const catsSlice = createSlice({
  name: 'cats',
  initialState: initState,
  reducers: {
    setCats: (state, action) => {
      state.cats = action.payload;
    },
    setSelectedCat: (state, action) => {
      state.selectedCat = action.payload;
    },
  },
});

export const { setCats, setSelectedCat } = catsSlice.actions;
export const catsReducer = catsSlice.reducer;
