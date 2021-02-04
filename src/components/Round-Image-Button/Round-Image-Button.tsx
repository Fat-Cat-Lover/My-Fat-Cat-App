import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RoundImageButtonProps } from './Round-Image-Button.interface';
import { RoundImageButtonStyle } from './Round-Image-Button.style';

export const RoundImageButton: React.FC<RoundImageButtonProps> = props => {
  return (
    <TouchableOpacity style={[RoundImageButtonStyle.contanier, props.style]} onPress={props.onPress}>
      <Image source={props.image} />
    </TouchableOpacity>
  );
};
