import React from 'react';
import { Text } from 'react-native';
import MfcFont from 'styles/fonts';
import { MfcHeaderTextProps } from './Header-Text.interface';
import { MfcHeaderTextStyle } from './Header-Text.style';

export const H1: React.FC<MfcHeaderTextProps> = props => {
  const type = props.type === 'medium' ? MfcFont.mediun : MfcFont.regular;

  return <Text style={[type, MfcHeaderTextStyle.header1]}>{props.children}</Text>;
};

export const H2: React.FC<MfcHeaderTextProps> = props => {
  const type = props.type === 'medium' ? MfcFont.mediun : MfcFont.regular;

  return <Text style={[type, MfcHeaderTextStyle.header2]}>{props.children}</Text>;
};

export const H3: React.FC<MfcHeaderTextProps> = props => {
  const type = props.type === 'medium' ? MfcFont.mediun : MfcFont.regular;

  return <Text style={[type, MfcHeaderTextStyle.header3]}>{props.children}</Text>;
};
