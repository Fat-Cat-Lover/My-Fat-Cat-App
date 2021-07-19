import { Database } from 'database/sqlite-manager';
import { CatFood } from 'models/cat-food';
import { EatingRecord } from 'models/diary';

// export function getDiary(catId: number, date: Date): Promise<Diary> {
//   const records = mockEatingRecords.filter(
//     record => record.catId === catId && dayjs(date).isSame(record.createdTime, 'day')
//   );

//   const excerciseTime = mockExcerciseTime
//     .filter(time => time.catId === catId && dayjs(date).isSame(time.createdTime, 'day'))
//     .reduce((p, c) => p + c.time, 0);
//   return Promise.resolve(JSON.parse(JSON.stringify(new MockDiary(records, excerciseTime))));
// }

export async function getDiary(catId: number, date: Date) {
  const db = await Database.getConnection();
  const [[eatingRecordResult], [excerciseTimeResult]] = await Promise.all([
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
  ]);

  let records: EatingRecord[] = [];
  if (eatingRecordResult) {
    for (let i = 0; i < eatingRecordResult.rows.length; i++) {
      records.push(eatingRecordResult.rows.item(i));
    }
  }
  const excerciseTime = excerciseTimeResult ? excerciseTimeResult.rows.item(0)['SUM(time)'] : 0;
  return { records, excerciseTime, diaryDate: date.toISOString() };
}

// export function addRecord(catId: number, foodId: number, weight: number, time: Date) {
//   const record = new MockEatingRecord(catId, foodId, weight, time);
//   mockEatingRecords.push(record);
//   return Promise.resolve(JSON.parse(JSON.stringify(record)));
// }

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

// export function addExerciseTime(catId: number, createdTime: Date, exerciseTime: number) {
//   const record = new MockExcerciseTime(catId, exerciseTime, createdTime);
//   mockExcerciseTime.push(record);
//   return Promise.resolve(JSON.parse(JSON.stringify(record)));
// }

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

// export function getWeightRecord(catId: number, filter: number) {
//   return Promise.resolve(mockWeightRecord.filter(record => record.catId === catId).slice(-filter));
// }

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

// export function addWeightRecord(catId: number, createdTime: Date, weight: number) {
//   mockWeightRecord.push({ catId, createdTime, weight });
//   return Promise.resolve({ catId, createdTime, weight });
// }

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
