import { Transform } from 'class-transformer';

export class Cat {
  id: number;
  name: string;
  image?: string;
  useDefault?: string;
  description?: string;
  birthday: number;

  @Transform(({ value }) => (value === 0 ? 'female' : 'male'))
  sex: 'male' | 'female';

  @Transform(({ value }) => (value === 0 ? false : true))
  isNeuter: boolean;

  @Transform(({ value }) => {
    if (value === 0) {
      return 'nonactive';
    } else if (value === 1) {
      return 'normal';
    } else {
      return 'active';
    }
  })
  active: 'active' | 'normal' | 'nonactive';
  dailyCalories: number;
  currentWeight: number;
  targetWeight: number;
  preWeight?: number;

  @Transform(({ value }) => (value ? value.toISOString() : undefined), {
    toPlainOnly: true,
  })
  latestHealthCheck?: Date;

  get age() {
    return new Date().getFullYear() - this.birthday;
  }
}
