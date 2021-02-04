import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import React from 'react';
import { Text, View } from 'react-native';

export const DatePicker: React.FC = props => {
  return (
    <View>
      <MfcIcon name="keyboardArrowLeft" />
      <Text onPress={}></Text>
      <MfcIcon name="keyboardArrowRight" />
    </View>
  );
};
