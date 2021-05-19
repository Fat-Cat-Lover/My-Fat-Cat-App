import { plainToClass } from 'class-transformer';
import { Cat } from 'models/cat';
import { RootState } from 'redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectCats = createSelector<RootState, Cat[], Cat[]>(
  state => state.cats.cats,
  cats => plainToClass(Cat, cats)
);

// export function selectCats(state: RootState) {
//   return plainToClass(Cat, state.cats.cats);
// }

export function getSelectedCat(state: RootState) {
  return state.cats.selectedCat;
}
