import { ItemValue } from '@react-native-picker/picker/typings/Picker';

type Option = {
  label: string;
  value: ItemValue;
};

export interface SelectInputProps {
  label?: string;
  options: Option[];
  selectedIndex: number;
  onChange: (value: ItemValue, index: number) => void;
}
