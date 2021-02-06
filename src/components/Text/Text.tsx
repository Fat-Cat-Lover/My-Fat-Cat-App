import React from 'react';
import { Text } from 'react-native';
import { MfcTextProps } from './Text.interface';
import { MfcTextSizes } from './Text.style';
import MfcFont from 'styles/fonts';

export const MfcText: React.FC<MfcTextProps> = props => {
  const type = props.type === 'medium' ? MfcFont.mediun : MfcFont.regular;
  const size = props.size ? MfcTextSizes[props.size] : MfcTextSizes.normal;

  return <Text style={[type, size, props.style]}>{props.children}</Text>;
};
