import React from 'react';
import { MfcText } from 'components/Text/Text';
import { View } from 'react-native';
import { BaseInputProps } from './Base-Inpur.interface';
import { BaseInputStyle } from './Base-Input.style';

export const BaseInput: React.FC<BaseInputProps> = props => {
  return (
    <View style={BaseInputStyle.constainer}>
      {props.label && <MfcText style={BaseInputStyle.label}>{props.label}</MfcText>}
      {props.children}
    </View>
  );
};
