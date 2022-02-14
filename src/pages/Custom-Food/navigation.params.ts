import { CustomFood } from 'models/cat-food';

export type CustomFoodParams = {
  addCustomFood: undefined;
  editCustomFood: CustomFood & { brandName: string };
};
