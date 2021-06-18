import { Cat } from 'models/cat';

const _mockCats: Cat[] = [
  {
    id: 1,
    name: 'Kiwi',
    image: 'https://pbs.twimg.com/media/ErS3SKeVcAQVnAJ?format=jpg&name=medium',
    description: '老貓咪了沒牙齒了，很愛爆吃爆吐，還好沒有潛在疾病，腸胃不太好',
    age: 12,
    sex: 'male',
    isNeuter: true,
    active: 'normal',
    dailyCalories: 300,
    currentWeight: 7.1,
    targetWeight: 6.8,
    preWeight: 6.9,
    latestHealthCheck: new Date(),
  },
  {
    id: 2,
    name: '嵐',
    image: 'https://pbs.twimg.com/media/D8jcyGkUEAA7EjP?format=jpg&name=large',
    description: '不動',
    age: 3,
    sex: 'female',
    isNeuter: true,
    active: 'nonactive',
    dailyCalories: 250,
    currentWeight: 4,
    targetWeight: 5,
  },
];

export const MockCats = JSON.parse(JSON.stringify(_mockCats));
