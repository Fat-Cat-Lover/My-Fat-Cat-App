import { Database } from 'database/sqlite-manager';
import { mockBrands, mockCateories, mockCatFoods } from 'mocks/cat-food';

export function getFoodTypes() {
  return Promise.resolve(mockCateories);
}

export function getBrands(foodTypeId: number) {
  return Promise.resolve(mockBrands.filter(brand => brand.foodTypeIds.some(id => id === foodTypeId)));
}

export function getCatFoods(foodTypeId: number, brandId: number) {
  return Promise.resolve(
    mockCatFoods.filter(catFood => catFood.foodTypeId === foodTypeId && catFood.brandId === brandId)
  );
}

type IAddCustomFood = {
  createdTime: string;
  foodType: string;
  brand: string;
  foodName: string;
  calories: number;
  crudeProtein: number;
  crudeFat: number;
  carbohydrate: number;
  moisture: number;
};

export async function addCustomFood(data: IAddCustomFood) {
  const db = await Database.getConnection();
  return db.executeSql(
    `
    INSERT INTO CustomFood(
      createdTime,
      foodType,
      brand,
      foodName,
      calories,
      crudeProtein,
      crudeFat,
      carbohydrate,
      moisture
    )
    VALUE(
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    );
  `,
    [
      data.createdTime,
      data.foodType,
      data.brand,
      data.foodName,
      data.calories,
      data.crudeProtein,
      data.crudeFat,
      data.carbohydrate,
      data.moisture,
    ]
  );
}
