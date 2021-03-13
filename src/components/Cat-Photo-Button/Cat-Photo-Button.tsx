import React from 'react';
import { CatPhotoButtonProps } from './Cat-Photo-Button.interface';
import { Image, TouchableOpacity } from 'react-native';
import { CatPhotoButtonStyle } from './Cat-Photo-Button.style';

export const CatPhotoButton: React.FC<CatPhotoButtonProps> = props => {
  const size = props.size ? props.size : 55;
  const styleStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image source={props.image} style={[styleStyle, CatPhotoButtonStyle.image, props.style]} />
    </TouchableOpacity>
  );
};
