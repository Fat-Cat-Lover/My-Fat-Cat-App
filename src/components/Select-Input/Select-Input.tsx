import React from 'react';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { SelectInputProps } from './Select-Input.interface';
import Picker from 'react-native-picker-select';
import { SelectInputStyle } from './Select-Input.style';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import colors from 'styles/colors';

export const SelectInput: React.FC<SelectInputProps> = props => {
  return (
    <BaseInput label={props.label}>
      <Picker
        style={{
          inputAndroid: SelectInputStyle.input,
          placeholder: SelectInputStyle.placeholder,
          iconContainer: SelectInputStyle.iconContainer,
        }}
        onValueChange={props.onChange}
        items={props.options}
        useNativeAndroidPickerStyle={false}
        Icon={() => <MfcIcon name="expandMore" />}
        fixAndroidTouchableBug={true}
        placeholder={{
          label: props.placeholder,
          value: null,
          color: colors.mainGray,
        }}
      />
    </BaseInput>
  );
};
