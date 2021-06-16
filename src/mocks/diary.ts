import dayjs from 'dayjs';
import { Diary } from 'models/diary';
import { EatingRecord } from 'models/eating-record';
import { mockBrands, mockCateories, mockCatFoods } from './cat-food';

const today = dayjs();
const yesterday = today.subtract(1, 'day');
const tomorrow = today.add(1, 'day');

export class MockDiary extends Diary {
  constructor(public records: EatingRecord[], public excerciseTime: number) {
    super();
  }
}

export class MockEatingRecord extends EatingRecord {
  id: string;
  constructor(public catId: number, foodId: number, weight: number, createdTime: Date) {
    super();
    const food = mockCatFoods.find(c => c.id === foodId)!;
    const foodType = mockCateories.find(c => c.id === food.foodTypeId)!;
    const brand = mockBrands.find(b => b.id === food.brandId)!;
    this.id = Math.random().toString(36).substr(2, 9);
    this.createdTime = createdTime;
    this.weight = weight;
    this.foodType = foodType.type;
    this.brand = brand.name;
    this.foodName = food.name;
    const ratio = weight / 100;
    this.calories = food.calories * ratio;
    this.crudeProtein = food.crudeProtein * ratio;
    this.crudeFat = food.crudeFat * ratio;
  }
}

export class MockExcerciseTime {
  constructor(public catId: number, public time: number, public createdTime: Date) {}
}

export const mockEatingRecords = [
  new MockEatingRecord(1, 1, 50, today.hour(7).toDate()),
  new MockEatingRecord(1, 2, 65, yesterday.hour(11).toDate()),
  new MockEatingRecord(1, 1, 50, yesterday.hour(15).toDate()),
  new MockEatingRecord(1, 4, 65, tomorrow.hour(9).toDate()),
  new MockEatingRecord(1, 3, 100, tomorrow.hour(19).toDate()),
  new MockEatingRecord(2, 5, 65, today.hour(13).toDate()),
  new MockEatingRecord(2, 6, 50, today.hour(16).toDate()),
  new MockEatingRecord(2, 2, 65, yesterday.hour(20).toDate()),
  new MockEatingRecord(2, 3, 100, tomorrow.hour(3).toDate()),
  new MockEatingRecord(2, 5, 50, tomorrow.hour(17).toDate()),
  new MockEatingRecord(2, 4, 50, tomorrow.hour(23).toDate()),
];

export const mockExcerciseTime = [
  new MockExcerciseTime(1, 10, today.hour(7).toDate()),
  new MockExcerciseTime(1, 7, yesterday.hour(11).toDate()),
  new MockExcerciseTime(1, 8, yesterday.hour(15).toDate()),
  new MockExcerciseTime(1, 11, tomorrow.hour(9).toDate()),
  new MockExcerciseTime(1, 9, tomorrow.hour(19).toDate()),
  new MockExcerciseTime(2, 6, today.hour(13).toDate()),
  new MockExcerciseTime(2, 7, today.hour(16).toDate()),
  new MockExcerciseTime(2, 13, tomorrow.hour(17).toDate()),
  new MockExcerciseTime(2, 17, tomorrow.hour(23).toDate()),
];
