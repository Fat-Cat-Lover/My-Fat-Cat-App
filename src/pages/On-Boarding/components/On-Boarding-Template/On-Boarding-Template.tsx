import React from 'react';
import { Image, View } from 'react-native';
import { OnBoardingTemplateProps } from './On-Boarding-Template.interface';
import { OnBoardTemplateStyle } from './On-Boarding-Template.style';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcText } from 'components/Text/Text';
import { CommonStyle } from 'styles/common-style';

export const OnBoardingTemplate: React.FC<OnBoardingTemplateProps> = props => {
  return (
    <View style={OnBoardTemplateStyle.container}>
      <View>
        <Image source={props.image} />
      </View>
      <View style={OnBoardTemplateStyle.title}>
        <MfcHeaderText size="large" type="medium" style={CommonStyle.grayText}>
          {props.title}
        </MfcHeaderText>
        <MfcText size="large" style={CommonStyle.grayText}>
          {props.subTitle}
        </MfcText>
      </View>
      <View>{props.navigationBlock}</View>
    </View>
  );
};
