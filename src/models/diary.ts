import { Type } from 'class-transformer';
import { EatingRecord } from './eating-record';

export class Diary {
  @Type(() => EatingRecord)
  records: EatingRecord[];
  excerciseTime: number;

  get caloriesEatenToday(): number {
    return this.records.reduce((pre, cur) => pre + (cur.calories || 0), 0);
  }
}
