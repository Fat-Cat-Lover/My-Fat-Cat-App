import { ICONS } from 'components/MFC-Icon/icons';
import { StyleProp, ViewStyle } from 'react-native';

type Option<T> = {
  label: string;
  value: T;
  key?: string | number;
};

export interface SelectInputProps<T> {
  label?: string;
  options: Option<T>[];
  onChange: (value: T, index: number) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  value?: T | null;
  icon?: keyof typeof ICONS;
  itemKey?: string | number;
}
