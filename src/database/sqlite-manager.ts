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
      CREATE TABLE IF NOT EXISTS Cat(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT,
        useDefault TEXT,
        description TEXT,
        birthday INTEGER NOT NULL,
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
          id INTEGER PRIMARY KEY,
          catId TEXT NOT NULL,
          weight REAL NOT NULL,
          createdTime TEXT NOT NULL,
          FOREIGN KEY (catId)
            REFERENCES Cats (id)
        );
    `);
    transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS EatingRecord(
          id INTEGER PRIMARY KEY,
          catId TEXT NOT NULL,
          createdTime TEXT NOT NULL,
          weight REAL NOT NULL,
          foodType TEXT,
          brand TEXT,
          foodName TEXT,
          calories REAL NOT NULL,
          crudeProtein REAL NOT NULL,
          crudeFat REAL NOT NULL,
          carbohydrate REAL NOT NULL,
          moisture REAL NOT NULL,
          FOREIGN KEY (catId)
            REFERENCES Cats (id)
        );
    `);
    transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS ExcerciseTime(
          id INTEGER PRIMARY KEY,
          catId TEXT NOT NULL,
          createdTime TEXT NOT NULL,
          time INTEGER NOT NULL,
          FOREIGN KEY (catId)
            REFERENCES Cats (id)
        );
    `);
    transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS CustomFood(
          id INTEGER PRIMARY KEY,
          createdTime TEXT NOT NULL,
          weight REAL NOT NULL,
          foodType TEXT,
          brand TEXT,
          foodName TEXT,
          calories REAL NOT NULL,
          crudeProtein REAL NOT NULL,
          crudeFat REAL NOT NULL,
          carbohydrate REAL NOT NULL,
          moisture REAL NOT NULL,
        );
    `);
  }
}

export const Database = new SQLiteManager();
