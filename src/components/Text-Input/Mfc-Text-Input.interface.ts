import { KeyboardTypeOptions } from 'react-native';

export interface MfcTextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
  onTextChange: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}
