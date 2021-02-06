import { ImageStyle, StyleProp } from 'react-native';
import { ICONS } from './icons';

export interface MfcIconProps {
  name: IconName;
  color?: string;
  style?: StyleProp<ImageStyle>;
}

type IconName = keyof typeof ICONS;
