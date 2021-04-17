import { KeyboardTypeOptions } from 'react-native';

export interface MfcTextInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}
