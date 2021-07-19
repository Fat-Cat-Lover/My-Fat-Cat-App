import React from 'react';
import { View } from 'react-native';
import { NutritionBlockProps } from './Nutrition-Block.interface';
import { MfcText } from 'components/Text/Text';
import { CommonStyle } from 'styles/common-style';
import { NutritionBlockStyle } from './Nutrition-Block.style';

export const NutritionBlock: React.FC<NutritionBlockProps> = props => {
  return (
    <View style={NutritionBlockStyle.container}>
      <MfcText size="small" style={[CommonStyle.grayText, NutritionBlockStyle.title]}>
        {props.title}
      </MfcText>
      <MfcText size="normal" type="medium" style={[CommonStyle.grayText, NutritionBlockStyle.weight]}>
        {props.weight.toFixed(2)} g
      </MfcText>
    </View>
  );
};
