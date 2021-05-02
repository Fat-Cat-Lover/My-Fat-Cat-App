import { plainToClass } from 'class-transformer';
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

  // addCat() {
  //   return SQLite.db.transaction(tx => tx.executeSql(``))
  // }
}

export function getCats(): Promise<Cat[]> {
  return Promise.resolve(plainToClass(Cat, MockCats));
}
