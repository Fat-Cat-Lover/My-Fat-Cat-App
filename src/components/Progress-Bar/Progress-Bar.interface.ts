import { StyleProp, ViewStyle } from 'react-native';

export interface ProgressBarProps {
  progress: number;
  barStyle?: StyleProp<ViewStyle>;
  barColor: string;
}
