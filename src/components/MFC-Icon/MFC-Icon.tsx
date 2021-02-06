import React from 'react';
import { Image } from 'react-native';
import { ICONS } from './icons';
import { MfcIconProps } from './MFC-icon.interface';

export const MfcIcon: React.FC<MfcIconProps> = props => {
  const icon = ICONS[props.name];

  return <Image source={icon} style={props.style} />;
};
