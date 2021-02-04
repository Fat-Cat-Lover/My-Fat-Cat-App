import { StyleProp, TextStyle } from 'react-native';

export interface MfcHeaderTextProps {
  type?: 'regular' | 'medium';
  size?: 'large' | 'normal' | 'small';
  style?: StyleProp<TextStyle>;
}
