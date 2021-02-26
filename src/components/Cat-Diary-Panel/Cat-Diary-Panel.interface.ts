import { Cat } from 'models/cat';

export interface CatDiaryProps {
  cats: Cat[];
  selectedCat: number;
  DiaryHeaderLeft?: React.ComponentType;
  onCatSelect?: (index: number) => any;
}
