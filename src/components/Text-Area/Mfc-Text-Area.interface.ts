import { TextStyle } from 'react-native';

export interface MfcTextAreaProps {
  label?: string;
  value: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onTextChange: (text: string) => void;
  numberOfLines?: number;
  maxLength?: number;
  emptyInputStyle?: TextStyle;
  filledInputStyle?: TextStyle;
}
