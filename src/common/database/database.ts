import SQLite from 'react-native-sqlite-storage';
import { Column, Tables } from './schema';

SQLite.enablePromise(true);

class SQLiteManager {
  private db: SQLite.SQLiteDatabase;

  async initDb() {
    return SQLite.openDatabase({ name: 'Test.db', location: 'default', createFromLocation: 1 }).then(db => {
      this.db = db;
      return this.createTableFromSchema();
    });
  }

  async createTableFromSchema() {
    if (this.db) {
      return this.db.transaction(tx => {
        for (const name in Tables) {
          this.createTable(tx, name, Tables[name]);
        }
      });
    }
  }

  async createTable(transaction: SQLite.Transaction, tableName: string, table: Record<string, Column>) {
    const base = `CREATE TABLE IF NOT EXISTS ${tableName} `;
    const columns = [];
    for (const key in table) {
      columns.push(
        `${key} ${table[key].type} ${table[key].primary_key ? 'PRIMARY KEY NOT NULL AUTOINCREMENT' : ''} default ${
          table[key].default_value
        }`
      );
    }
    const sql = base + `(${columns.join(',')})`;
    return transaction.executeSql(sql);
  }

  async executeSql(sql: string) {
    if (!this.db) {
      await this.initDb();
    }
    return this.db.executeSql(sql);
  }
}

export default new SQLiteManager();
