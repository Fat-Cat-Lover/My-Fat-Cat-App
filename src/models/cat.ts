import { Transform } from 'class-transformer';

export class Cat {
  id: number;
  name: string;
  image?: string;
  useDefault?: string;
  description?: string;
  age: number;
  sex: 'male' | 'female';
  isNeuter: boolean;
  active: 'active' | 'normal' | 'nonactive';
  dailyCalories: number;
  currentWeight: number;
  targetWeight: number;
  preWeight?: number;

  @Transform(({ value }) => (value ? value.toISOString() : undefined), {
    toPlainOnly: true,
  })
  latestHealthCheck?: Date;
}
