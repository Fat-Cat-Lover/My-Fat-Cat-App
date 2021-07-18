import { StyleProp, ViewStyle } from 'react-native';

export interface DateInputProps {
  label?: string;
  value?: Date;
  placeholder?: string;
  onChange: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
}
