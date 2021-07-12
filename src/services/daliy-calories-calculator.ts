const DER = {
  kitten: 2.5,
  unneutered: 1.4,
  neutered: 1.4,
  inactive: 1,
  old: 1.1,
};

export class DailyCaloriesCalculator {
  private calcRER(weight: number) {
    return Math.pow(weight, 0.75) * 70;
  }

  calcDailyCalories(age: number, isNeuter: boolean, active: 'active' | 'normal' | 'nonactive', targetWeight: number) {
    let der: number;
    if (age < 1) {
      der = DER.kitten;
    } else if (age >= 1 && age <= 10) {
      if (isNeuter) {
        if (active === 'nonactive') {
          der = DER.inactive;
        } else {
          der = DER.neutered;
        }
      } else {
        der = DER.unneutered;
      }
    } else {
      der = DER.old;
    }

    return parseFloat((this.calcRER(targetWeight) * der).toFixed(1));
  }
}
