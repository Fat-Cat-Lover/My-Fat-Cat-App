import { plainToClass } from 'class-transformer';
import { Cat } from 'models/cat';
import { RootState } from 'redux/store';

export function selectCats(state: RootState) {
  return plainToClass(Cat, state.cats.cats);
}
