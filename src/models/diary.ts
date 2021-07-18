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
  // crudeFiber?: number;
  carbohydrate: number;
  // ash?: number;
  // calcium?: number;
  // phosphorus?: number;
  // sodium?: number;
  // magnesium?: number;
  moisture: number;
}

export class Diary {
  @Type(() => EatingRecord)
  records: EatingRecord[];
  excerciseTime: number;

  get caloriesEatenToday(): number {
    return this.records.reduce((pre, cur) => pre + (cur.calories || 0), 0);
  }
}
