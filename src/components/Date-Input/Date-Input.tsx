import React, { useState } from 'react';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { DateInputProps } from './Date-Input.interface';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MfcText } from 'components/Text/Text';
import { InputStyle } from 'styles/input';
import dayjs from 'dayjs';
import { View } from 'react-native';
import { InputLabel } from 'components/Input-Label/Input-Label';
import colors from 'styles/colors';

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
    <View style={props.style}>
      {props.label && <InputLabel label={props.label} />}
      <TouchableOpacity
        onPress={openDatePicker}
        style={[InputStyle.input, props.value ? InputStyle.filledInput : InputStyle.emptyInput]}>
        <MfcText style={[InputStyle.text, props.value ? { color: colors.black } : { color: colors.mainGray }]}>
          {props.value ? dayjs(props.value).format('YYYY/MM/DD') : props.placeholder}
        </MfcText>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={props.value ? props.value : new Date()}
          mode="date"
          onChange={(event, date) => onDateChange(event, date)}
        />
      )}
    </View>
  );
};
