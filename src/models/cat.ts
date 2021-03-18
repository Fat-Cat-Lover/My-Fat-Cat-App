export class Cat {
  id: number;
  name: string;
  image?: string;
  useDefault?: string;
  discription: string;
  age: number;
  sex: 'male' | 'female';
  isNeuter: boolean;
  dailyCalories: number;
  currentWeight: number;
  targetWeight: number;
  preWeight?: number;
}
