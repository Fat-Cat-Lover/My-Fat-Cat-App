import React from 'react';
import { ProgressBar } from 'components/Progress-Bar/Progress-Bar';
import { View } from 'react-native';
import { AddCatProgressBarProps } from './Add-Cat-Progress-Bar.interface';
import { AddCatProgressBarStyle } from './Add-Cat-Progress-Bar.style';
import { MfcText } from 'components/Text/Text';

export const AddCatProgressBar: React.FC<AddCatProgressBarProps> = props => {
  return (
    <View>
      <ProgressBar
        progress={(props.currnetStep / props.totalStep) * 0.9}
        barStyle={AddCatProgressBarStyle.BarContainer}
        barColor={AddCatProgressBarStyle.barColor.backgroundColor}
      />
      <MfcText>{`Step ${props.currnetStep}`}</MfcText>
    </View>
  );
};
