import dayjs from 'dayjs';
import { Diary } from 'models/diary';
import { EatingRecord } from 'models/eating-record';

const today = dayjs();
const yesterday = today.subtract(1, 'day');
const tomorrow = today.add(1, 'day');

export class MockDiary extends Diary {
  constructor(public records: EatingRecord[], public excerciseTime: number) {
    super();
  }
}

export const mockDiarys = {
  [`1/${today.format('YYYYMMDD')}`]: new MockDiary([new EatingRecord(1, 50, 50, 1, 1)], 10),
  [`1/${yesterday.format('YYYYMMDD')}`]: new MockDiary(
    [new EatingRecord(1, 65, 65, 1, 1), new EatingRecord(1, 50, 50, 1, 1)],
    15
  ),
  [`1/${tomorrow.format('YYYYMMDD')}`]: new MockDiary(
    [new EatingRecord(1, 65, 65, 1, 1), new EatingRecord(1, 100, 100, 1, 1)],
    20
  ),
  [`2/${today.format('YYYYMMDD')}`]: new MockDiary(
    [new EatingRecord(1, 65, 65, 1, 1), new EatingRecord(1, 50, 50, 1, 1)],
    13
  ),
  [`1/${yesterday.format('YYYYMMDD')}`]: new MockDiary([new EatingRecord(1, 65, 65, 1, 1)], 10),
  [`1/${tomorrow.format('YYYYMMDD')}`]: new MockDiary(
    [new EatingRecord(1, 100, 100, 1, 1), new EatingRecord(1, 50, 50, 1, 1), new EatingRecord(1, 50, 50, 1, 1)],
    30
  ),
};
