import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { MfcButtonProps } from './Button.interface';

export const FmcButton: React.FC<MfcButtonProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
};
