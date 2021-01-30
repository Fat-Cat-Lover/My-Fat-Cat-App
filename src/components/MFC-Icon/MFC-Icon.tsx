import React from 'react';
import { ICONS } from './icons';
import { MfcIconProps } from './MFC-icon.interface';

export const MfcIcon: React.FC<MfcIconProps> = props => {
  const Icon = ICONS[props.name];
  const defaultColor = '';
  const defaultHeight = 0;
  const defaultWidth = 0;
  return (
    <Icon
      fill={props.fill ? props.fill : defaultColor}
      height={props.height ? props.height : defaultHeight}
      width={props.width ? props.width : defaultWidth}
    />
  );
};
