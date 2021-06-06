export interface TimeInputProps {
  label?: string;
  value?: Date;
  placeholder?: string;
  onChange: (date: Date) => void;
}
