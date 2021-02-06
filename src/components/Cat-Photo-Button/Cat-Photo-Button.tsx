import React from 'react';
import { RoundImageButton } from 'components/Round-Image-Button/Round-Image-Button';
import { catImages, CatPhotoButtonProps } from './Cat-Photo-Button.interface';

export const CatPhotoButton: React.FC<CatPhotoButtonProps> = props => {
  if (typeof props.image === 'string') {
    const image = catImages[props.image];
    return <RoundImageButton image={image} onPress={props.onPress} style={props.style} />;
  } else {
    return <RoundImageButton image={props.image} onPress={props.onPress} style={props.style} />;
  }
};
