import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RoundImageButtonProps } from './Round-Button.interface';
import { RoundImageButtonStyle } from './Round-Button.style';

export const RoundImageButton: React.FC<RoundImageButtonProps> = props => {
  const size = props.size ? props.size : 60;
  return (
    <TouchableOpacity
      style={[RoundImageButtonStyle.contanier, { width: size, height: size, borderRadius: size / 2 }, props.style]}
      onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};
