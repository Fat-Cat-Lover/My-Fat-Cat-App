import { Cat } from 'models/cat';
import { ViewStyle } from 'react-native';

export interface PetDetailProps {
  cat: Cat;
  style?: ViewStyle;
  editButtonPress?: (catId: number) => void;
}
