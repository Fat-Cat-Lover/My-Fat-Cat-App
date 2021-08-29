import { Database } from 'database/sqlite-manager';
import { CatFood } from 'models/cat-food';
import { DailyMemo, EatingRecord } from 'models/diary';

export async function getDiary(catId: number, date: Date) {
  const db = await Database.getConnection();
  const [[eatingRecordResult], [excerciseTimeResult], [memoResult]] = await Promise.all([
    db.executeSql(
      `
    SELECT * FROM EatingRecord
    WHERE catId = ?
    AND createdTime BETWEEN datetime(?, 'start of day') AND datetime(?, '+1 day', 'start of day');
  `,
      [catId, date.toISOString(), date.toISOString()]
    ),
    db.executeSql(
      `
      SELECT SUM(time) FROM ExcerciseTime
      WHERE catId = ?
      AND createdTime BETWEEN datetime(?, 'start of day') AND datetime(?, '+1 day', 'start of day');
    `,
      [catId, date.toISOString(), date.toISOString()]
    ),
    db.executeSql(
      `
      SELECT id, memo FROM DailyMemo
      WHERE catId = ?
      AND date BETWEEN datetime(?, 'start of day') AND datetime(?, '+1 day', 'start of day');
      `,
      [catId, date.toISOString(), date.toISOString()]
    ),
  ]);

  let records: EatingRecord[] = [];
  if (eatingRecordResult) {
    for (let i = 0; i < eatingRecordResult.rows.length; i++) {
      records.push(eatingRecordResult.rows.item(i));
    }
  }
  const excerciseTime = excerciseTimeResult ? excerciseTimeResult.rows.item(0)['SUM(time)'] : 0;
  const memo = memoResult ? (memoResult.rows.item(0) as DailyMemo) : null;
  return { records, excerciseTime, diaryDate: date.toISOString(), memo };
}

export async function addRecord(
  catId: number,
  foodType: string,
  brand: string,
  food: CatFood,
  weight: number,
  time: Date
) {
  const ratio = weight / 100;
  const calories = parseFloat((food.calories * ratio).toFixed(2));
  const crudeProtein = parseFloat((food.crudeProtein * ratio).toFixed(2));
  const crudeFat = parseFloat((food.crudeFat * ratio).toFixed(2));
  const moisture = parseFloat((food.moisture * ratio).toFixed(2));
  const carbohydrate = parseFloat((food.carbohydrate * ratio).toFixed(2));

  const db = await Database.getConnection();
  const [result] = await db.executeSql(
    `
    INSERT INTO EatingRecord (
      catId,
      createdTime,
      weight,
      foodType,
      brand,
      foodName,
      calories,
      crudeProtein,
      crudeFat,
      carbohydrate,
      moisture
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `,
    [
      catId,
      time.toISOString(),
      weight,
      foodType,
      brand,
      food.name,
      calories,
      crudeProtein,
      crudeFat,
      carbohydrate,
      moisture,
    ]
  );

  return {
    id: result.insertId,
    createdTime: time.toISOString(),
    weight,
    foodType,
    brand,
    foodName: food.name,
    calories,
    crudeProtein,
    crudeFat,
    carbohydrate,
    moisture,
  };
}

export async function addExerciseTime(catId: number, createdTime: Date, exerciseTime: number) {
  const db = await Database.getConnection();
  await db.executeSql(
    `
    INSERT INTO ExcerciseTime(catId, createdTime, time)
    VALUES (?, ?, ?);
  `,
    [catId, createdTime.toISOString(), exerciseTime]
  );
  return exerciseTime;
}

export async function getWeightRecord(catId: number, filter: number) {
  const db = await Database.getConnection();
  const [result] = await db.executeSql(
    `
    SELECT * FROM WeightRecord
    WHERE catId = ?
    ORDER BY datetime(createdTime) ASC
    LIMIT ?;
  `,
    [catId, filter]
  );
  if (result) {
    let records = [];
    for (let i = 0; i < result.rows.length; i++) {
      records.push(result.rows.item(i));
    }
    return records;
  } else {
    return [];
  }
}

export async function addWeightRecord(catId: number, createdTime: Date, weight: number) {
  const db = await Database.getConnection();
  await db.transaction(tx => {
    tx.executeSql(
      `
    INSERT INTO WeightRecord (catId, weight, createdTime)
    VALUES (?, ?, ?);
  `,
      [catId, weight, createdTime.toISOString()]
    );
    tx.executeSql(
      `
      UPDATE Cat Set
        currentWeight =?
      WHERE id = ?;
    `,
      [weight, catId]
    );
  });
  return { catId, createdTime: createdTime.toISOString(), weight };
}

export async function addDailyMemo(catId: number, date: Date, memo: string) {
  const db = await Database.getConnection();
  await db.executeSql(
    `
    INSERT INTO DailyMemo (memo, catId, date)
    VALUES (
      ?,
      ?,
      ?
    )
    `,
    [memo, catId, date.toISOString()]
  );
  const [result] = await db.executeSql('SELECT last_insert_rowid()');
  return { id: result.rows.item(0), memo };
}

export async function updateDailyMemo(memoId: number, memo: string) {
  const db = await Database.getConnection();
  await db.executeSql(
    `
      UPDATE DailyMemo
      SET memo = ?
      WHERE id = ?
    `,
    [memo, memoId]
  );
}
