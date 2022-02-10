import { value Database } from 'database/sqlite-manager';
import { value Brand, value CatFood, value CatFoodDetail, value CustomFood, value FoodType } from 'models/cat-food';

const api = 'https://my-fat-cat-api.herokuapp.com/my-fat-cat-api/';

export async function getFoodTypes(): Promise<FoodType[]> {
  const res = await fetch(api + 'food-types');
  return await res.json();
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

export async function getCatFoodDetail(foodId: number): Promise<CatFoodDetail | null> {
  const res = await fetch(api + `foods/${foodId}`);
  return await res.json();
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

export async function getCustomFoods(foodType: string, brandId: number): Promise<CustomFood[]> {
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

export async function getCustomFoodDetail(foodId: number): Promise<CatFoodDetail | null> {
  const db = await Database.getConnection();
  const [result] = await db.executeSql(
    `
    SELECT CustomFoods.*, Brands.name as brandName
    FROM CustomFoods
    INNER JOIN Brands
    ON Brands.id = CustomFoods.brandId AND CustomFoods.id = ?;
    `,
    [foodId]
  );
  if (result.rows.length > 0) {
    const data = result.rows.item(0);
    return {
      id: data.id,
      name: data.foodName,
      calories: data.calories,
      crudeProtein: data.crudeProtein,
      crudeFat: data.crudeFat,
      carbohydrate: data.carbohydrate,
      moisture: data.moisture,
      food_type: {
        id: 0,
        food_type: data.foodType,
      },
      brand: {
        id: data.brandId,
        name: data.brandName,
      },
    };
  } else {
    return null;
  }
}

export async function addCustomFood(data: IAddCustomFood): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
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
          ],
          (transaction, result) => {
            resolve(result.insertId);
          }
        );
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function getCustomFoodList(): Promise<(CustomFood & { brandName: string })[]> {
  const db = await Database.getConnection();
  const [result] = await db.executeSql(`
    SELECT * FROM CustomFoods, Brands.name as brandName
    INNER JOIN Brands
    ON Brands.id = CustomFoods.brandId
  `);
  let data = [];
  if (result.rows.length > 0) {
    for (let i = 0; i < result.rows.length; i++) {
      data.push(result.rows.item(i));
    }
  } else {
  }
  return data;
}

interface IEditCustomFood extends IAddCustomFood {
  id: number
}

export async function editCustomFood(data: IEditCustomFood) {
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

    tx.executeSql(`
    UPDATE CustomFoods SET
      foodType = ?,
      brandId = (SELECT id FROM Brands WHERE name = ?),
      foodName = ?,
      calories = ?,
      crudeProtein = ?,
      crudeFat = ?,
      carbohydrate = ?,
      moisture = ?
    WHERE id = ?;
  `, [
    data.foodType,
    data.brand,
    data.foodName,
    data.calories,
    data.crudeProtein,
    data.crudeFat,
    data.carbohydrate,
    data.moisture,
    data.id
  ])
  },

  );
}

export async function deleteCustomFood(id: number) {
  const db = await Database.getConnection();
  await db.executeSql(`
    DELETE FROM CustomFoods
    WHERE id = ?
  `, [id]);
}