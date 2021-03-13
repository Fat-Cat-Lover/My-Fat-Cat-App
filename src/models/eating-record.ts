export class EatingRecord {
  id: string;
  created_time: Date;
  constructor(
    public cat_id: number,
    public weight: number,
    public calories: number,
    public crude_protein: number,
    public crude_fat: number,
    public crude_fiber?: number,
    public carbohydrate?: number,
    public ash?: number,
    public calcium?: number,
    public phosphorus?: number,
    public sodium?: number,
    public magnesium?: number,
    public moisture?: number,
    public food_id?: number
  ) {}
}
