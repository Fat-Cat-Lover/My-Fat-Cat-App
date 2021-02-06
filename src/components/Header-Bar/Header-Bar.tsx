import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import React from 'react';
import { View } from 'react-native';
import { HeaderBarProps } from './Header-Bar.interface';
import { HeadBarStyle } from './Header-Bar.style';

export const HeaderBar: React.FC<HeaderBarProps> = props => {
  return (
    <View style={HeadBarStyle.container}>
      <View style={HeadBarStyle.headerSide}>
        <MfcIcon name="cat" />
      </View>
      <View style={HeadBarStyle.headerTitle}>
        <MfcHeaderText type="regular" size="small">
          {props.children}
        </MfcHeaderText>
      </View>
      <View style={HeadBarStyle.headerSide}>{props.headerRight}</View>
    </View>
  );
};
