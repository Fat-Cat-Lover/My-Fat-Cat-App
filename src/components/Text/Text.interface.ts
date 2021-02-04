import { StyleProp, TextStyle } from 'react-native';

export interface MfcTextProps {
  type?: 'regular' | 'medium';
  size?: 'large' | 'normal' | 'small';
  style?: StyleProp<TextStyle>;
}
