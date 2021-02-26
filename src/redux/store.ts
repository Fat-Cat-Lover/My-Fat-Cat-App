import { configureStore } from '@reduxjs/toolkit';
import { catsReducer } from './cats/slice';
import { diaryDateResucer } from './diary-date/slice';

export const store = configureStore({
  reducer: {
    diaryDate: diaryDateResucer,
    cats: catsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
