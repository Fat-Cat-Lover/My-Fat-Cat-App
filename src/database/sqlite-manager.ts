import SQLite from 'react-native-sqlite-storage';

class SQLiteManager {
  db: SQLite.SQLiteDatabase;

  async getConnection() {
    if (this.db) {
      return this.db;
    } else {
      return this.open();
    }
  }

  async open() {
    if (this.db) {
      return this.db;
    } else {
      SQLite.DEBUG(true);
      SQLite.enablePromise(true);
      const db = await SQLite.openDatabase({ name: 'MyFatCat', location: 'default' });

      await db.transaction(this.createTables);
      this.db = db;
      return db;
    }
  }

  createTables(transaction: SQLite.Transaction) {
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS OnBoard(
        onBoard INTEGER
      );
    `);
  }
}

export const Database = new SQLiteManager();
