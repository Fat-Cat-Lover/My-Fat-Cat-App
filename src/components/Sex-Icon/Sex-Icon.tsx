import React from 'react';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { View } from 'react-native';
import { SexIconProps } from './Sex-Icon.interface';
import { SexIconStyle } from './Sex-Icon.style';

export const SexIcon: React.FC<SexIconProps> = props => {
  const _size = props.size ? props.size : 55;
  const size = {
    height: _size,
    width: _size,
    borderRadius: _size / 2,
  };
  return (
    <View
      style={[
        SexIconStyle.container,
        size,
        props.sex === 'male' ? SexIconStyle.male : SexIconStyle.female,
        props.style,
      ]}>
      <MfcIcon name={props.sex} style={[SexIconStyle.icon]} />
    </View>
  );
};
