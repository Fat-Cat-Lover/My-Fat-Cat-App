import { StyleProp, ViewStyle } from 'react-native';

export interface BaseInputProps {
  label?: string;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
}
