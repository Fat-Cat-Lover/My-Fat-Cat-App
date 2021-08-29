import { Transform, Type } from 'class-transformer';

export class EatingRecord {
  id: number;

  @Transform(({ value }) => value.toISOString(), {
    toPlainOnly: true,
  })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  createdTime: Date;
  weight: number;
  foodType: string;
  brand: string;
  foodName: string;
  calories: number;
  crudeProtein: number;
  crudeFat: number;
  carbohydrate: number;
  moisture: number;
}

export class Diary {
  @Type(() => EatingRecord)
  records: EatingRecord[];
  excerciseTime: number;
  memo?: DailyMemo;
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  diaryDate: Date;

  get caloriesEatenToday(): number {
    return this.records.reduce((pre, cur) => pre + (cur.calories || 0), 0);
  }
}

export class WeightRecord {
  id: number;
  catId: string;
  weight: number;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  createdTime: Date;
}

export class DailyMemo {
  id: number;
  // catId: number;

  // @Transform(({ value }) => new Date(value), { toClassOnly: true })
  // date: Date;

  memo: string;
}
