import dayjs from 'dayjs';
import {
  MockDiary,
  MockEatingRecord,
  mockEatingRecords,
  MockExcerciseTime,
  mockExcerciseTime,
  mockWeightRecord,
} from 'mocks/diary';
import { Diary } from 'models/diary';

export function getDiary(catId: number, date: Date): Promise<Diary> {
  const records = mockEatingRecords.filter(
    record => record.catId === catId && dayjs(date).isSame(record.createdTime, 'day')
  );

  const excerciseTime = mockExcerciseTime
    .filter(time => time.catId === catId && dayjs(date).isSame(time.createdTime, 'day'))
    .reduce((p, c) => p + c.time, 0);
  return Promise.resolve(JSON.parse(JSON.stringify(new MockDiary(records, excerciseTime))));
}

export function addRecord(catId: number, foodId: number, weight: number, time: Date) {
  const record = new MockEatingRecord(catId, foodId, weight, time);
  mockEatingRecords.push(record);
  return Promise.resolve(JSON.parse(JSON.stringify(record)));
}

export function addExerciseTime(catId: number, createdTime: Date, exerciseTime: number) {
  const record = new MockExcerciseTime(catId, exerciseTime, createdTime);
  mockExcerciseTime.push(record);
  return Promise.resolve(JSON.parse(JSON.stringify(record)));
}

export function getWeightRecord(catId: number, filter: number) {
  return Promise.resolve(mockWeightRecord.filter(record => record.catId === catId).slice(-filter));
}

export function addWeightRecord(catId: number, createdTime: Date, weight: number) {
  mockWeightRecord.push({ catId, createdTime, weight });
  return Promise.resolve({ catId, createdTime, weight });
}
