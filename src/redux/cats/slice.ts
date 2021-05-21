import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cat } from 'models/cat';
import { getCats as _getCats, addCat as _addCat } from 'services/cat';

interface CatsState {
  cats: Cat[];
  selectedCat: number;
}

const initState: CatsState = {
  cats: [],
  selectedCat: 0,
};

export const getCats = createAsyncThunk('cats/getCats', async () => {
  const cats = await _getCats();
  return cats;
});

export const addCat = createAsyncThunk<Cat, Partial<Cat>>('cats/addCat', async cat => await _addCat(cat));

const catsSlice = createSlice({
  name: 'cats',
  initialState: initState,
  reducers: {
    setSelectedCat: (state, action) => {
      state.selectedCat = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCats.fulfilled, (state, action) => {
      state.cats = action.payload;
    });
    builder.addCase(addCat.fulfilled, (state, action) => {
      state.cats.push(action.payload);
    });
  },
});

export const { setSelectedCat } = catsSlice.actions;
export const catsReducer = catsSlice.reducer;
