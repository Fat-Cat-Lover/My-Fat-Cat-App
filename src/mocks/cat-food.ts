import { Brand, FoodType, CatFood } from 'models/cat-food';

export const mockCateories: FoodType[] = [
  { id: 1, type: '生食' },
  { id: 2, type: '主食罐' },
  { id: 3, type: '副食罐' },
  { id: 4, type: '乾飼料' },
];

export const mockBrands: Brand[] = [
  { id: 1, name: '好味小姐', foodTypeIds: [2] },
  { id: 2, name: '野起來吃', foodTypeIds: [1, 2] },
  { id: 3, name: '汪喵星球', foodTypeIds: [1, 2, 3] },
  { id: 4, name: '希爾斯', foodTypeIds: [1, 2, 3, 4] },
];

export const mockCatFoods: CatFood[] = [
  { id: 1, foodTypeId: 2, brandId: 1, name: '好味雞胸肉', calories: 100, crudeProtein: 12, crudeFat: 3 },
  { id: 2, foodTypeId: 1, brandId: 2, name: '鵪鶉', calories: 160, crudeProtein: 8, crudeFat: 3 },
  { id: 3, foodTypeId: 1, brandId: 2, name: '土雞', calories: 200, crudeProtein: 12, crudeFat: 3 },
  { id: 4, foodTypeId: 1, brandId: 3, name: '草飼牛', calories: 120, crudeProtein: 9, crudeFat: 3 },
  { id: 5, foodTypeId: 2, brandId: 3, name: '雞肉鮭魚', calories: 90, crudeProtein: 12, crudeFat: 3 },
  { id: 6, foodTypeId: 3, brandId: 3, name: '鮪魚', calories: 125, crudeProtein: 10, crudeFat: 3 },
  { id: 7, foodTypeId: 5, brandId: 4, name: '雞肉野莓', calories: 105, crudeProtein: 11, crudeFat: 3 },
];
