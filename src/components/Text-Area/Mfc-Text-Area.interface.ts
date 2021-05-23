import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface MfcTextAreaProps {
  label?: string;
  value: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange: (text: string) => void;
  numberOfLines?: number;
  maxLength?: number;
  emptyInputStyle?: StyleProp<TextStyle>;
  filledInputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  containerStyle: StyleProp<ViewStyle>;
}
