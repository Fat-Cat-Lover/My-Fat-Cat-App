import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import React from 'react';
import { View } from 'react-native';

export const SelectedCheckmark: React.FC = props => {
  return (
    <View style>
      <MfcIcon name="done" />
    </View>
  );
};
