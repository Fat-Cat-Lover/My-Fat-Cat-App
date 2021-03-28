import React from 'react';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { SelectInputProps } from './Select-Input.interface';
import Picker from 'react-native-picker-select';
import { SelectInputStyle } from './Select-Input.style';

export const SelectInput: React.FC<SelectInputProps> = props => {
  return (
    <BaseInput label={props.label}>
      <Picker
        style={{ viewContainer: SelectInputStyle.container }}
        onValueChange={props.onChange}
        items={props.options}
      />
    </BaseInput>
  );
};
