import { Cat } from 'models/cat';

export interface CatDiaryProps {
  cats: Cat[];
  DiaryHeaderLeft?: React.ComponentType;
  onCatSelect?: (index: number) => any;
}
