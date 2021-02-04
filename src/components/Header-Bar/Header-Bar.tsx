import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import React from 'react';
import { View } from 'react-native';
import { HeadBarStyle } from './Head-Bar.style';

export const HeaderBar: React.FC = props => {
  return (
    <View style={HeadBarStyle.container}>
      <MfcIcon name="cat" style={HeadBarStyle.headerIcon} />
      {props.children}
    </View>
  );
};
