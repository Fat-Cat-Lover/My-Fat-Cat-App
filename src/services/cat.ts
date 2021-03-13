import axios from 'axios';
import { MockCats } from 'mocks/cats';
import { Cat } from 'models/cat';

export function getCats(): Promise<Cat[]> {
  return Promise.resolve(MockCats);
}
