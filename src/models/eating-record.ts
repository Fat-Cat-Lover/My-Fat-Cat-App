import { Transform } from 'class-transformer';

export class EatingRecord {
  id: string;

  @Transform(({ value }) => value.toISOString(), {
    toPlainOnly: true,
  })
  created_time: Date;
  constructor(
    public weight: number,
    public foodType: string,
    public foodName: string,
    public calories: number,
    public crudeProtein: number,
    public crudeFat: number,
    public crudeFiber?: number,
    public carbohydrate?: number,
    public ash?: number,
    public calcium?: number,
    public phosphorus?: number,
    public sodium?: number,
    public magnesium?: number,
    public moisture?: number
  ) {}
}
