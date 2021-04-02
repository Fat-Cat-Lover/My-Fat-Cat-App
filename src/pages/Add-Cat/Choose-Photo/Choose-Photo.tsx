import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { ProgressBar } from 'components/Progress-Bar/Progress-Bar';
import React from 'react';
import { View } from 'react-native';

export const ChoosePhoto: React.FC = props => {
  return (
    <View>
      <HeaderBar>新增寵物</HeaderBar>
      <ProgressBar barStyle={} barColor={} progress={1 / 3} />
    </View>
  );
};
