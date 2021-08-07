import { Database } from 'database/sqlite-manager';
import { mockBrands, mockCateories, mockCatFoods } from 'mocks/cat-food';
import { Brand, CatFood } from 'models/cat-food';

export function getFoodTypes() {
  return Promise.resolve(mockCateories);
}

export function getBrands(foodTypeId: number): Promise<Brand[]> {
  return Promise.resolve(mockBrands.filter(brand => brand.foodTypeIds.some(id => id === foodTypeId)));
}

export function getCatFoods(foodTypeId: number, brandId: number) {
  return Promise.resolve(
    mockCatFoods.filter(catFood => catFood.foodTypeId === foodTypeId && catFood.brandId === brandId)
  );
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
