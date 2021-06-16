type DataType = 'TEXT' | 'INTEGER' | 'REAL' | 'BLOB';

export interface Column {
  type: DataType;
  primary_key: boolean;
  default_value: any;
}

export const Tables: Record<string, Record<string, Column>> = {
  Cats: {
    id: { type: 'INTEGER', primary_key: false, default_value: null },
    name: { type: 'TEXT', primary_key: false, default_value: null },
    image: { type: 'TEXT', primary_key: false, default_value: null },
    useDefault: { type: 'TEXT', primary_key: false, default_value: null },
    description: { type: 'TEXT', primary_key: false, default_value: null },
    age: { type: 'INTEGER', primary_key: false, default_value: null },
    sex: { type: 'TEXT', primary_key: false, default_value: null },
    isNeuter: { type: 'INTEGER', primary_key: false, default_value: null },
    active: { type: 'TEXT', primary_key: false, default_value: null },
    dailyCalories: { type: 'REAL', primary_key: false, default_value: null },
    currentWeight: { type: 'REAL', primary_key: false, default_value: null },
    targetWeight: { type: 'REAL', primary_key: false, default_value: null },
    preWeight: { type: 'REAL', primary_key: false, default_value: null },
    latestHealthCheck: { type: 'TEXT', primary_key: false, default_value: null },
  },
  EatingRecords: {
    id: { type: 'INTEGER', primary_key: false, default_value: null },
    catId: { type: 'INTEGER', primary_key: false, default_value: null },
    createdTime: { type: 'TEXT', primary_key: false, default_value: null },
    weight: { type: 'REAL', primary_key: false, default_value: null },
    foodType: { type: 'TEXT', primary_key: false, default_value: null },
    foodName: { type: 'TEXT', primary_key: false, default_value: null },
    calories: { type: 'REAL', primary_key: false, default_value: null },
    crudeProtein: { type: 'REAL', primary_key: false, default_value: null },
    crudeFat: { type: 'REAL', primary_key: false, default_value: null },
    crudeFiber: { type: 'REAL', primary_key: false, default_value: null },
    carbohydrate: { type: 'REAL', primary_key: false, default_value: null },
    ash: { type: 'REAL', primary_key: false, default_value: null },
    calcium: { type: 'REAL', primary_key: false, default_value: null },
    phosphorus: { type: 'REAL', primary_key: false, default_value: null },
    sodium: { type: 'REAL', primary_key: false, default_value: null },
    magnesium: { type: 'REAL', primary_key: false, default_value: null },
    moisture: { type: 'REAL', primary_key: false, default_value: null },
  },
};
