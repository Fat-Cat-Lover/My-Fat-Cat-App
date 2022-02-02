import React from 'react';
import { View } from 'react-native';
import Picker from 'react-native-picker-select';
import { SelectInputProps } from './Select-Input.interface';
import { SelectInputStyle } from './Select-Input.style';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import colors from 'styles/colors';
import { InputLabel } from 'components/Input-Label/Input-Label';

export const SelectInput = <T extends {}>(props: SelectInputProps<T>) => {
  return (
    <View style={props.style}>
      {props.label ? <InputLabel label={props.label} /> : undefined}
      <Picker
        style={{
          inputAndroid: SelectInputStyle.input,
          placeholder: SelectInputStyle.placeholder,
          iconContainer: SelectInputStyle.iconContainer,
        }}
        value={props.value!}
        onValueChange={props.onChange}
        items={props.options}
        useNativeAndroidPickerStyle={false}
        Icon={props.icon ? () => <MfcIcon name={props.icon!} /> : undefined}
        fixAndroidTouchableBug={true}
        placeholder={{
          label: props.placeholder,
          value: null,
          color: colors.mainGray,
        }}
      />
    </View>
  );
};
