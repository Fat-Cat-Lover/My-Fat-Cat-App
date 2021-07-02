import React from 'react';
import { ImageSourcePropType } from 'react-native';

export interface OnBoardingTemplateProps {
  image: ImageSourcePropType;
  title: string;
  subTitle: string;
  navigationBlock: React.ReactNode;
}
