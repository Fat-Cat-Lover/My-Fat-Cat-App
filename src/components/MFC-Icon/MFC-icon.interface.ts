import { ICONS } from './icons';

export interface MfcIconProps {
  name: IconName;
  fill: string;
  height: number;
  width: number;
}

type IconName = keyof typeof ICONS;
