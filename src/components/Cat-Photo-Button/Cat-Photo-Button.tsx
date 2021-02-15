import React from 'react';
import { RoundImageButton } from 'components/Round-Button/Round-Button';
import { CatPhotoButtonProps } from './Cat-Photo-Button.interface';
import { Image } from 'react-native';
import { CatPhotoButtonStyle } from './Cat-Photo-Button.style';

export const CatPhotoButton: React.FC<CatPhotoButtonProps> = props => {
  return (
    <RoundImageButton size={props.size} onPress={props.onPress} style={[CatPhotoButtonStyle.button, props.style]}>
      <Image source={props.image} />
    </RoundImageButton>
  );
};
