import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cat } from 'models/cat';
import { requestEnd, requestStart } from 'redux/loading/slice';
import { getCats as _getCats, addCat as _addCat, editCat as _editCat, IAddCat, IEditCat } from 'services/cat';

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

export const addCat = createAsyncThunk<Partial<Cat>, IAddCat>('cats/addCat', async (cat, thunkApi) => {
  thunkApi.dispatch(requestStart({}));
  const newCat = await _addCat(cat);
  thunkApi.dispatch(requestEnd({}));
  return newCat;
});

export const editCat = createAsyncThunk<Cat, IEditCat>('cats/editCat', async (cat, thunkApi) => {
  thunkApi.dispatch(requestStart({}));
  const newCat = await _editCat(cat);
  thunkApi.dispatch(requestEnd({}));
  return newCat;
});

const catsSlice = createSlice({
  name: 'cats',
  initialState: initState,
  reducers: {
    setSelectedCat: (state, action) => {
      state.selectedCat = action.payload;
    },
    updateCatWeight: (state, action) => {
      state.cats.find(cat => cat.id === action.payload.id)!.currentWeight = action.payload.weight;
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

export const { setSelectedCat, updateCatWeight } = catsSlice.actions;
export const catsReducer = catsSlice.reducer;
