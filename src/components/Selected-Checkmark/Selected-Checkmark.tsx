import React from 'react';
import { View } from 'react-native';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { SelectedCheckmarkStyle } from './Selected-Checkmark.style';
import { SelectedCheckmarkProps } from './Selected-Checkmark.interface';

export const SelectedCheckmark: React.FC<SelectedCheckmarkProps> = props => {
  const size = {
    width: props.size,
    height: props.size,
    borderRadius: props.size / 2,
  };
  return (
    <View style={[size, SelectedCheckmarkStyle.constainer, props.style]}>
      <MfcIcon name="done" />
    </View>
  );
};
