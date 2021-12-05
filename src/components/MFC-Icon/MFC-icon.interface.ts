import { ImageStyle, StyleProp } from 'react-native';
import { ICONS } from './icons';

export interface MfcIconProps {
  name: IconName;
  style?: StyleProp<ImageStyle>;
}

export type IconName = keyof typeof ICONS;
