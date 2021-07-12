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
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Cats(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT,
        useDefault TEXT,
        description TEXT,
        BIRTHDAY INTEGER NOT NULL,
        sex INTEGER NOT NULL,
        isNeuter INTEGER NOT NULL,
        active INTEGER NOT NULL,
        dailyCalories REAL NOT NULL,
        currentWeight REAL NOT NULL,
        targetWeight REAL NOT NULL,
        preWeight REAL,
        latestHealthCheck TEXT
      );
    `);
    transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS WeightRecord(
          catId TEXT NOT NULL,
          weight REAL NOT NULL,
          FOREIGN KEY (catId)
            REFERENCES Cats (id)
        );
    `);
  }
}

export const Database = new SQLiteManager();
