export interface Cateory {
  id: number;
  cateory: string;
}

export interface Brand {
  id: number;
  name: string;
  cateoryIds: number[];
}

export interface CatFood {
  id: number;
  categoryId: number;
  brandId: number;
  name: string;
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
