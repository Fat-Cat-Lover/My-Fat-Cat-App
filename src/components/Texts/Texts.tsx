import React from 'react';
import { Text } from 'react-native';
import { MfcTextProps } from './Text.interface';
import { MfcTextStyle } from './Text.style';
import MfcFont from 'styles/fonts';

export const T1: React.FC<MfcTextProps> = props => {
  const type = props.type === 'medium' ? MfcFont.mediun : MfcFont.regular;

  return <Text style={[type, MfcTextStyle.body1]}>{props.children}</Text>;
};

export const T2: React.FC<MfcTextProps> = props => {
  const type = props.type === 'medium' ? MfcFont.mediun : MfcFont.regular;

  return <Text style={[type, MfcTextStyle.body2]}>{props.children}</Text>;
};

export const T3: React.FC<MfcTextProps> = props => {
  const type = props.type === 'medium' ? MfcFont.mediun : MfcFont.regular;

  return <Text style={[type, MfcTextStyle.body3]}>{props.children}</Text>;
};
