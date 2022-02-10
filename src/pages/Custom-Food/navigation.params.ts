import { CustomFood } from 'models/cat-food';

export type CustomFoodParams = {
  customFoodList: { edit?: boolean };
  addCustomFood: undefined;
  editCustomFood: CustomFood & { brandName: string };
};
