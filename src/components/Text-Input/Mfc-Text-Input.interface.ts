import { KeyboardTypeOptions } from 'react-native';

export interface MfcTextInputProps {
  label?: string;
  placeholder?: string;
  inputText?: string;
  keyboardType?: KeyboardTypeOptions;
  validation?: (value: string) => null | { errorMessage: string };
}
