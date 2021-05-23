import { Cat } from 'models/cat';

export interface CatDiaryProps {
  cats: Cat[];
  DiaryHeaderRight?: React.ReactNode;
  onCatSelect?: (index: number) => any;
  addButtonOnPress?: () => void;
}
