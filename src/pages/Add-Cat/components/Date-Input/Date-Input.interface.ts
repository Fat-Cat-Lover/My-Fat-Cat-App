export interface DateInputProps {
  label?: string;
  value?: Date;
  placeholder?: string;
  onChange: (date: Date) => void;
}
