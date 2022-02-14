import { IconName } from 'components/MFC-Icon/MFC-icon.interface';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonColors } from './Button.style';
export interface MfcButtonProps {
  color?: keyof typeof ButtonColors;
  style?: StyleProp<ViewStyle>;
  onPress?: () => any;
  disabled?: boolean;
  iconName?: IconName;
  textStyle?: StyleProp<TextStyle>;
}
