import dayjs from 'dayjs';
import { MockDiary, mockEatingRecords, mockExcerciseTime } from 'mocks/diary';
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
