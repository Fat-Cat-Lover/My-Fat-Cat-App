export interface FoodType {
  id: number;
  type: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface CatFood {
  id: number;
  foodTypeId: number;
  brandId: number;
  name: string;
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
