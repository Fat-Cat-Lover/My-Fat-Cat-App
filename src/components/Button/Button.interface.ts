import { StyleProp, ViewStyle } from 'react-native';
import { ButtonColors } from './Button.style';
export interface MfcButtonProps {
  color?: keyof typeof ButtonColors;
  style?: StyleProp<ViewStyle>;
  onPress?: () => any;
  disabled?: boolean;
}
