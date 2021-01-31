import { ICONS } from './icons';

export interface MfcIconProps {
  name: IconName;
  color?: string;
  height?: number;
  width?: number;
}

type IconName = keyof typeof ICONS;
