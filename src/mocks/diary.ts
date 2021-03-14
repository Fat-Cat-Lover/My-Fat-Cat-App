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
  [`1/${today.format('YYYYMMDD')}`]: new MockDiary([new EatingRecord(50, '生食', '野起來吃雞肉', 50, 1, 1)], 10),
  [`1/${yesterday.format('YYYYMMDD')}`]: new MockDiary(
    [new EatingRecord(65, '生食', '野起來吃鮭魚', 65, 1, 1), new EatingRecord(50, '主食罐', '汪喵星球雞肉', 50, 1, 1)],
    15
  ),
  [`1/${tomorrow.format('YYYYMMDD')}`]: new MockDiary(
    [new EatingRecord(65, '生食', '野起來吃雞肉', 65, 1, 1), new EatingRecord(100, '生食', '野起來吃雞肉', 100, 1, 1)],
    20
  ),
  [`2/${today.format('YYYYMMDD')}`]: new MockDiary(
    [
      new EatingRecord(65, '主食罐', '汪喵星球雞肉', 65, 1, 1),
      new EatingRecord(50, '主食罐', '汪喵星球雞肉', 50, 1, 1),
    ],
    13
  ),
  [`1/${yesterday.format('YYYYMMDD')}`]: new MockDiary([new EatingRecord(65, '主食罐', '汪喵星球雞肉', 65, 1, 1)], 10),
  [`1/${tomorrow.format('YYYYMMDD')}`]: new MockDiary(
    [
      new EatingRecord(100, '生食', '野起來吃雞肉', 100, 1, 1),
      new EatingRecord(50, '生食', '野起來吃雞肉', 50, 1, 1),
      new EatingRecord(50, '生食', '野起來吃雞肉', 50, 1, 1),
    ],
    30
  ),
};
