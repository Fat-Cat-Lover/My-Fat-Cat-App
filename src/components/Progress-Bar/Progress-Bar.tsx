import React from 'react';
import { View } from 'react-native';
import { ProgressBarProps } from './Progress-Bar.interface';
import { ProgressBarStyle } from './Progress-Bar.style';

export const ProgressBar: React.FC<ProgressBarProps> = props => {
  return (
    <View style={[ProgressBarStyle.container, props.barStyle]}>
      <View style={[ProgressBarStyle.bar, { width: `${props.progress * 100}%`, backgroundColor: props.barColor }]} />
    </View>
  );
};
