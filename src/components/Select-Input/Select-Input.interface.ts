import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { StyleProp, ViewStyle } from 'react-native';

type Option = {
  label: string;
  value: ItemValue;
};

export interface SelectInputProps {
  label?: string;
  options: Option[];
  onChange: (value: ItemValue, index: number) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}
