import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cat } from 'models/cat';
import { getCats as _getCats, addCat as _addCat, editCat as _editCat, IAddCat } from 'services/cat';

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

export const addCat = createAsyncThunk<Partial<Cat>, IAddCat>('cats/addCat', async cat => await _addCat(cat));

export const editCat = createAsyncThunk<Cat, Partial<Cat>>('cats/editCat', async cat => await _editCat(cat));

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
      state.cats.push(action.payload as Cat);
      state.selectedCat = state.cats.length - 1;
    });
    builder.addCase(editCat.fulfilled, (state, action) => {
      const index = state.cats.findIndex(_cat => _cat.id === action.payload.id);
      state.cats[index] = action.payload;
    });
  },
});

export const { setSelectedCat } = catsSlice.actions;
export const catsReducer = catsSlice.reducer;
