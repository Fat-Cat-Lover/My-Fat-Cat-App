import React from 'react';
import { CheckboxProps } from './Checkbox.interface';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcText } from 'components/Text/Text';
import { CheckboxStyle } from './Checkbox.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Checkbox: React.FC<CheckboxProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onChange}
      style={[CheckboxStyle.container, props.checked ? CheckboxStyle.checked : CheckboxStyle.unchecked]}>
      {props.checked ? <MfcIcon name="done" style={CheckboxStyle.checkmark} /> : undefined}
      <MfcText type="medium" size="large">
        {props.value}
      </MfcText>
    </TouchableOpacity>
  );
};
