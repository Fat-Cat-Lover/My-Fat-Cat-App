import React from 'react';
import { MfcText } from 'components/Text/Text';
import { View } from 'react-native';
import { PetTagProps } from './Pet-Tag.interface';
import { PetTagStyle } from './Pet-Tag.style';

export const PetTag: React.FC<PetTagProps> = props => {
  return (
    <View style={[PetTagStyle.container, props.style]}>
      <MfcText size="small" style={PetTagStyle.content}>
        {props.tag}
      </MfcText>
    </View>
  );
};
