import React from 'react';
import { Image } from 'react-native';
import { ICONS } from './icons';
import { MfcIconProps } from './MFC-icon.interface';
import Colors from 'styles/colors';

export const MfcIcon: React.FC<MfcIconProps> = props => {
  const icon = ICONS[props.name];

  const color = props.color ? props.color : Colors.darkGray;

  return <Image source={icon} style={{ tintColor: color }} />;
};
