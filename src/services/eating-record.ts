import { mockBrands, mockCateories, mockCatFoods } from 'mocks/cat-food';

export function getCategories() {
  return Promise.resolve(mockCateories);
}

export function getBrands(categoryId: number) {
  return Promise.resolve(mockBrands.filter(brand => brand.cateoryIds.some(id => id === categoryId)));
}

export function getCatFoods(categoryId: number, brandId: number) {
  return Promise.resolve(
    mockCatFoods.filter(catFood => catFood.categoryId === categoryId && catFood.brandId === brandId)
  );
}
