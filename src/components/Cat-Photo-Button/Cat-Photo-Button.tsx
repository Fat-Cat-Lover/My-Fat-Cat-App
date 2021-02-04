import React from 'react';
import { RoundImageButton } from 'components/Round-Image-Button/Round-Image-Button';
import { catImages, CatPhotoButtonProps } from './Cat-Photo-Button.interface';

export const CatPhotoButton: React.FC<CatPhotoButtonProps> = props => {
  const size = props.size ? props.size : 65;

  if (typeof props.image === 'string') {
    const image = catImages[props.image];
    return <RoundImageButton image={image} size={size} onPress={props.onPress} />;
  } else {
    return <RoundImageButton image={props.image} size={size} onPress={props.onPress} />;
  }
};
