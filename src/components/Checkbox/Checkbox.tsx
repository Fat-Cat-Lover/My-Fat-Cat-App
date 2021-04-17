import React from 'react';
import { View } from 'react-native';
import { CheckboxProps } from './Checkbox.interface';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcText } from 'components/Text/Text';
import { CheckboxStyle } from './Checkbox.style';

export const Checkbox: React.FC<CheckboxProps> = props => {
  return (
    <View style={[CheckboxStyle.container, props.checked ? CheckboxStyle.checked : CheckboxStyle.unchecked]}>
      {props.checked ? <MfcIcon name="done" style={CheckboxStyle.checkmark} /> : undefined}
      <MfcText type="medium" size="large">
        {props.label}
      </MfcText>
    </View>
  );
};
