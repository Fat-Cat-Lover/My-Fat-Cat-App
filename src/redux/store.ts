import { configureStore } from '@reduxjs/toolkit';
import { catsReducer } from './cats/slice';
import { diaryDateResucer } from './diary-date/slice';
import { diaryReducer } from './diary/slice';
import { onBoardReducer } from './on-board/slice';

export const store = configureStore({
  reducer: {
    diaryDate: diaryDateResucer,
    cats: catsReducer,
    diary: diaryReducer,
    onBoard: onBoardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
