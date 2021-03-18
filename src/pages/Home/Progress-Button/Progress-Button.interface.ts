export interface ProgressButtonProps {
  icon: 'sport' | 'food';
  progress: number;
  progressText: string;
  progressBarColor: string;
  buttonText: string;
  buttonColor: 'primary' | 'green';
  onPress?: () => any;
}
