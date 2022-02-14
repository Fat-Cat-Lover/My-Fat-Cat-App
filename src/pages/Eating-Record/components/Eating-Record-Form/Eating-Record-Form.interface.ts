import { Cat } from 'models/cat';
import { CatFoodDetail } from 'models/cat-food';

export interface EatingRecordFormProps {
  cat: Cat;
  date: string;
  remainCalories: number;
  food?: CatFoodDetail;
  customFood?: boolean;
  weight?: number;
}
