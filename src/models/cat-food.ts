export interface FoodType {
  id: number;
  food_type: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface CatFood {
  id: number;
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

export interface CustomFood extends CatFood {
  createdTime: string;
  foodType: string;
  brandId: number;
}

export interface CatFoodDetail extends CatFood {
  food_type: FoodType;
  brand: Brand;
}
