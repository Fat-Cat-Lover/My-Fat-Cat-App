import { Cat } from 'models/cat';

const _mockCats: Cat[] = [
];

export const MockCats = JSON.parse(JSON.stringify(_mockCats));
