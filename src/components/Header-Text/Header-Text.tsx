import React from 'react';
import { Text } from 'react-native';
import MfcFont from 'styles/fonts';
import { MfcHeaderTextProps } from './Header-Text.interface';
import { MfcHeaderTextSizes } from './Header-Text.style';

export const MfcHeaderText: React.FC<MfcHeaderTextProps> = props => {
  const type = props.type === 'medium' ? MfcFont.mediun : MfcFont.regular;
  const size = props.size ? MfcHeaderTextSizes[props.size] : MfcHeaderTextSizes.normal;

  return <Text style={[type, size, props.style]}>{props.children}</Text>;
};
