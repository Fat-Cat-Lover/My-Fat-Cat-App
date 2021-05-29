import { MockCats } from 'mocks/cats';
import { Cat } from 'models/cat';
import SQLite from 'common/database/database';

export class CatService {
  getCats() {
    return SQLite.executeSql(`SELECT * FROM Cats`).then(([result]) => {
      const rows = result.rows;
      const cats = [];
      for (let i = 0; i < rows.length; i++) {
        cats.push(rows.item(i));
      }
      return cats;
    });
  }
}

export function getCats(): Promise<Cat[]> {
  return Promise.resolve(MockCats);
}

export function addCat(cat: Partial<Cat>): Promise<Cat> {
  const id = Math.random() * (10 - 3) + 3;
  cat.id = id;
  return Promise.resolve(JSON.parse(JSON.stringify(cat)) as Cat);
}

export function editCat(data: Partial<Cat>): Promise<Cat> {
  const cat = (MockCats as Cat[]).find(_cat => _cat.id === data.id)!;
  return Promise.resolve({ ...cat, ...data });
}
