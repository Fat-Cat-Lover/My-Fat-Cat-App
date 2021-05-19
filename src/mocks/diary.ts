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

export class MockEatingRecord extends EatingRecord {
  constructor(
    created_time: Date,
    weight: number,
    foodType: string,
    foodName: string,
    calories: number,
    crudeProtein: number,
    crudeFat: number,
    crudeFiber?: number,
    carbohydrate?: number,
    ash?: number,
    calcium?: number,
    phosphorus?: number,
    sodium?: number,
    magnesium?: number,
    moisture?: number
  ) {
    super(
      weight,
      foodType,
      foodName,
      calories,
      crudeProtein,
      crudeFat,
      crudeFiber,
      carbohydrate,
      ash,
      calcium,
      phosphorus,
      sodium,
      magnesium,
      moisture
    );
    this.id = Math.random().toString(36).substr(2, 9);
    this.created_time = created_time;
  }
}

const _mockDiarys = {
  [`1/${today.format('YYYYMMDD')}`]: new MockDiary(
    [new MockEatingRecord(today.hour(7).toDate(), 50, '生食', '野起來吃雞肉', 50, 1, 1)],
    10
  ),
  [`1/${yesterday.format('YYYYMMDD')}`]: new MockDiary(
    [
      new MockEatingRecord(yesterday.hour(11).toDate(), 65, '生食', '野起來吃鮭魚', 65, 1, 1),
      new MockEatingRecord(yesterday.hour(15).toDate(), 50, '主食罐', '汪喵星球雞肉', 50, 1, 1),
    ],
    15
  ),
  [`1/${tomorrow.format('YYYYMMDD')}`]: new MockDiary(
    [
      new MockEatingRecord(tomorrow.hour(9).toDate(), 65, '生食', '野起來吃雞肉', 65, 1, 1),
      new MockEatingRecord(tomorrow.hour(19).toDate(), 100, '生食', '野起來吃雞肉', 100, 1, 1),
    ],
    20
  ),
  [`2/${today.format('YYYYMMDD')}`]: new MockDiary(
    [
      new MockEatingRecord(today.hour(13).toDate(), 65, '主食罐', '汪喵星球雞肉', 65, 1, 1),
      new MockEatingRecord(today.hour(16).toDate(), 50, '主食罐', '汪喵星球雞肉', 50, 1, 1),
    ],
    13
  ),
  [`2/${yesterday.format('YYYYMMDD')}`]: new MockDiary(
    [new MockEatingRecord(yesterday.hour(20).toDate(), 65, '主食罐', '汪喵星球雞肉', 65, 1, 1)],
    10
  ),
  [`2/${tomorrow.format('YYYYMMDD')}`]: new MockDiary(
    [
      new MockEatingRecord(tomorrow.hour(3).toDate(), 100, '生食', '野起來吃雞肉', 100, 1, 1),
      new MockEatingRecord(tomorrow.hour(17).toDate(), 50, '生食', '野起來吃雞肉', 50, 1, 1),
      new MockEatingRecord(tomorrow.hour(23).toDate(), 50, '生食', '野起來吃雞肉', 50, 1, 1),
    ],
    30
  ),
};

export const mockDiarys = JSON.parse(JSON.stringify(_mockDiarys));
