import React, { useState } from 'react';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { DateInputProps } from './Date-Input.interface';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MfcText } from 'components/Text/Text';
import { InputStyle } from 'styles/input';
import dayjs from 'dayjs';

export const DateInput: React.FC<DateInputProps> = props => {
  const [showDatePicker, toggleShowPicker] = useState(false);

  function openDatePicker() {
    toggleShowPicker(true);
  }

  function onDateChange(event: Event, date?: Date) {
    toggleShowPicker(false);
    if (date) {
      props.onChange(date);
    }
  }

  return (
    <BaseInput label={props.label}>
      <TouchableOpacity onPress={openDatePicker} style={InputStyle.input}>
        <MfcText style={InputStyle.text}>{dayjs(props.value).format('YYYY/MM/DD')}</MfcText>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={new Date()} mode="date" onChange={(event, date) => onDateChange(event, date)} />
      )}
    </BaseInput>
  );
};
