import { Cat } from 'models/cat';

export const MockCats: Cat[] = [
  {
    id: 1,
    name: 'kiwi',
    image: 'https://pbs.twimg.com/media/ErS3SKeVcAQVnAJ?format=jpg&name=medium',
    discription: '胖',
    age: 12,
    sex: 'male',
    isNeuter: true,
    dailyCalories: 3200,
    currentWeight: 7.1,
    targetWeight: 6.8,
    preWeight: 6.9,
  },
  {
    id: 2,
    name: '橘',
    image:
      'https://instagram.ftpe4-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118070062_333898481070553_6211537845720984350_n.jpg?tp=1&_nc_ht=instagram.ftpe4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=fWHRijXEBhAAX83VbjD&oh=a73cdbb23b57c2d29971bf81d1af78ba&oe=60660DED',
    discription: '毛澎',
    age: 6,
    sex: 'female',
    isNeuter: true,
    dailyCalories: 2500,
    currentWeight: 4,
    targetWeight: 5,
  },
];
