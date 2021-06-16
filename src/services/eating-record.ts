import { mockBrands, mockCateories, mockCatFoods } from 'mocks/cat-food';
import { MockEatingRecord, mockEatingRecords } from 'mocks/diary';

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

export function addRecord(catId: number, foodId: number, weight: number, time: Date) {
  const record = new MockEatingRecord(catId, foodId, weight, time);
  mockEatingRecords.push(record);
  return record;
}
