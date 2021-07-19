import { Cat } from 'models/cat';
import { Database } from 'database/sqlite-manager';
import { DailyCaloriesCalculator } from './daliy-calories-calculator';
import CameraRoll from '@react-native-community/cameraroll';
import { Image } from 'react-native-image-crop-picker';

// export function getCats(): Promise<Cat[]> {
//   return Promise.resolve(MockCats);
// }

export async function getCats(): Promise<Cat[]> {
  const db = await Database.getConnection();
  let cats: Cat[] = [];
  const [result] = await db.executeSql('SELECT * FROM Cat');
  if (result) {
    for (let i = 0; i < result.rows.length; i++) {
      cats.push(result.rows.item(i));
    }
    return cats;
  } else {
    return [];
  }
}

// export function addCat(cat: Partial<Cat>): Promise<Cat> {
//   const id = Math.random() * (10 - 3) + 3;
//   cat.id = id;
//   return Promise.resolve(JSON.parse(JSON.stringify(cat)) as Cat);
// }

export type IAddCat = {
  name: string;
  age: number;
  sex: 'male' | 'female';
  description?: string;
  currentWeight: number;
  targetWeight: number;
  currentStep?: number;
  photo?: Image;
  useDefault?: string;
  isNeuter: boolean;
  active: 'active' | 'normal' | 'nonactive';
  latestHealthCheckDate?: Date;
};

export async function addCat(cat: IAddCat): Promise<Partial<Cat>> {
  const birthYear = new Date().getFullYear() - cat.age!;
  let imagePath: string;
  if (cat.photo) {
    imagePath = await CameraRoll.save(cat.photo.path, { album: 'your_fat_cat' });
  }
  const dailyCaloriesCalculator = new DailyCaloriesCalculator();
  let active: number;
  if (cat.active === 'active') {
    active = 2;
  } else if (cat.active === 'normal') {
    active = 1;
  } else {
    active = 0;
  }
  const db = await Database.getConnection();
  await db.transaction(tx => {
    tx.executeSql(
      `
       INSERT INTO Cat (
         name,
         description,
         image,
         useDefault,
         BIRTHDAY,
         sex,
         isNeuter,
         active,
         dailyCalories,
         currentWeight,
         targetWeight,
         latestHealthCheck
       )
       VALUES (
         ?,
         ?,
         ?,
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
        cat.name,
        cat.description,
        cat.photo ? imagePath : null,
        cat.photo ? null : cat.useDefault,
        birthYear,
        cat.sex === 'female' ? 0 : 1,
        cat.isNeuter ? 1 : 0,
        active,
        dailyCaloriesCalculator.calcDailyCalories(cat.age!, cat.isNeuter!, cat.active!, cat.targetWeight!),
        cat.currentWeight,
        cat.targetWeight,
        cat.latestHealthCheckDate?.toISOString(),
      ]
    );
    tx.executeSql(
      `
       INSERT INTO WeightRecord(catId, weight, createdTime)
       VALUES((SELECT last_insert_rowid()), ?, ?)
     `,
      [cat.currentWeight, new Date().toISOString()]
    );
  });
  const [result] = await db.executeSql('SELECT * FROM Cat WHERE name=?', [cat.name]);
  return result.rows.item(0);
}

// export function editCat(data: Partial<Cat>): Promise<Cat> {
//   const cat = (MockCats as Cat[]).find(_cat => _cat.id === data.id)!;
//   return Promise.resolve({ ...cat, ...data });
// }

export type IEditCat = {
  id: number;
  age: number;
  name: string;
  image?: Image;
  description: string;
  isNeuter: boolean;
  targetWeight: number;
  active: 'active' | 'normal' | 'nonactive';
  latestHealthCheckDate?: Date;
};

export async function editCat(data: IEditCat): Promise<Cat> {
  const db = await Database.getConnection();
  let imagePath;
  if (data.image) {
    imagePath = await CameraRoll.save(data.image.path, { album: 'your_fat_cat' });
  }

  let active: number;
  if (data.active === 'active') {
    active = 2;
  } else if (data.active === 'normal') {
    active = 1;
  } else {
    active = 0;
  }

  const dailyCaloriesCalculator = new DailyCaloriesCalculator();

  await db.executeSql(
    `
    UPDATE Cat SET
       name = ?,
      ${imagePath ? `image = "${imagePath}",` : ''}
       description = ?,
       isNeuter = ?,
       active = ?,
       dailyCalories = ?,
       targetWeight = ?,
       latestHealthCheck = ?
    WHERE id = ?
  `,
    [
      data.name,
      data.description,
      data.isNeuter ? 1 : 0,
      active,
      dailyCaloriesCalculator.calcDailyCalories(data.age, data.isNeuter, data.active, data.targetWeight),
      data.targetWeight,
      data.latestHealthCheckDate?.toISOString(),
      data.id,
    ]
  );
  const [result] = await db.executeSql('SELECT * FROM Cat WHERE id=?', [data.id]);
  return result.rows.item(0);
}
