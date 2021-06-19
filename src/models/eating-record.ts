import { Transform } from 'class-transformer';

export class EatingRecord {
  id: string;

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
  crudeFiber?: number;
  carbohydrate?: number;
  ash?: number;
  calcium?: number;
  phosphorus?: number;
  sodium?: number;
  magnesium?: number;
  moisture?: number;
}
