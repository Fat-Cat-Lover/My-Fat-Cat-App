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
