import { Database } from 'database/sqlite-manager';

export async function checkOnboard() {
  const db = await Database.getConnection();
  const result = (
    await db.executeSql(`
    SELECT onBoard FROM OnBoard
  `)
  )[0];
  const row = result.rows.item(0);
  if (row && row.onBoard) {
    return row.onBoard === 1;
  } else {
    return false;
  }
}

export async function onBoardFinish() {
  const db = await Database.getConnection();
  await db.executeSql(`
    REPLACE INTO OnBoard VALUES(1);
  `);
}
