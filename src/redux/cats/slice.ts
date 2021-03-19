import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { classToPlain } from 'class-transformer';
import { Cat } from 'models/cat';

interface CatsState {
  cats: Record<string, any>[];
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
    setCats: {
      reducer: (state, action: PayloadAction<Record<string, any>[]>) => {
        state.cats = action.payload;
      },
      prepare: (cats: Cat[]) => {
        return { payload: classToPlain(cats) as Record<string, any>[] };
      },
    },
    setSelectedCat: (state, action) => {
      state.selectedCat = action.payload;
    },
  },
});

export const { setCats, setSelectedCat } = catsSlice.actions;
export const catsReducer = catsSlice.reducer;
