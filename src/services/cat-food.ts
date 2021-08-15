import { Database } from 'database/sqlite-manager';
import { Brand, CatFood, FoodType } from 'models/cat-food';

const api = 'https://my-fat-cat-api.herokuapp.com/';

export async function getFoodTypes(): Promise<FoodType[]> {
  const res = await fetch(api + 'food-types');
  const data: { id: number; food_type: string }[] = await res.json();
  return data.map(d => ({ id: d.id, type: d.food_type }));
}

export async function getBrands(foodTypeId: number): Promise<Brand[]> {
  const res = await fetch(api + `food-types/${foodTypeId}/brands`);
  const data: { id: number; name: string }[] = await res.json();
  return data;
}

export async function getCatFoods(foodTypeId: number, brandId: number): Promise<CatFood[]> {
  const res = await fetch(api + `food-types/${foodTypeId}/brands/${brandId}/foods`);
  const data: {
    id: number;
    name: string;
    calories: number;
    crude_protein: number;
    crude_fat: number;
    carbohydrate: number;
    moisture: number;
  }[] = await res.json();
  return data.map(d => ({
    id: d.id,
    brandId,
    foodTypeId,
    name: d.name,
    calories: d.calories,
    crudeProtein: d.crude_protein,
    crudeFat: d.crude_fat,
    carbohydrate: d.carbohydrate,
    moisture: d.moisture,
  }));
}

type IAddCustomFood = {
  foodType: string;
  brand: string;
  foodName: string;
  calories: number;
  crudeProtein: number;
  crudeFat: number;
  carbohydrate: number;
  moisture: number;
};

export async function getCustomBrands(type: string): Promise<Brand[]> {
  const db = await Database.getConnection();

  const [result] = await db.executeSql(
    `
    SELECT b.id, b.name FROM Brands b
    INNER JOIN Brand_FoodTypes bf ON bf.foodType = ? AND bf.brandId = b.id;
    `,
    [type]
  );

  let data = [];
  if (result.rows.length) {
    for (let i = 0; i < result.rows.length; i++) {
      data.push(result.rows.item(i));
    }
  }
  return data;
}

export async function getCustomFoods(foodType: string, brandId: number): Promise<CatFood[]> {
  const db = await Database.getConnection();
  const [result] = await db.executeSql(
    `
    SELECT
      id,
      foodName as name,
      calories,
      crudeProtein,
      crudeFat,
      carbohydrate,
      moisture
    FROM CustomFoods
    WHERE foodType = ? AND brandId = ?;
  `,
    [foodType, brandId]
  );

  let data = [];
  for (let i = 0; i < result.rows.length; i++) {
    data.push(result.rows.item(i));
  }
  return data;
}

export async function addCustomFood(data: IAddCustomFood) {
  const db = await Database.getConnection();
  await db.transaction(tx => {
    tx.executeSql(
      `
    INSERT OR IGNORE INTO Brands(name)
    VALUES(?);
    `,
      [data.brand]
    );

    tx.executeSql(
      `
    INSERT OR IGNORE INTO Brand_FoodTypes(foodType, brandId)
    VALUES(?, (SELECT id FROM Brands WHERE name = ?));
    `,
      [data.foodType, data.brand]
    );

    tx.executeSql(
      `
    INSERT INTO CustomFoods(
      createdTime,
      foodType,
      brandId,
      foodName,
      calories,
      crudeProtein,
      crudeFat,
      carbohydrate,
      moisture
    )
    VALUES(
      datetime('now'),
      ?,
      (SELECT id FROM Brands WHERE name = ?),
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    );
  `,
      [
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
  });
  return;
}
