import { plainToClass } from 'class-transformer';
import { MockCats } from 'mocks/cats';
import { Cat } from 'models/cat';

export function getCats(): Promise<Cat[]> {
  return Promise.resolve(plainToClass(Cat, MockCats));
}
