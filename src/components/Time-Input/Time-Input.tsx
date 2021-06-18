import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { InputLabel } from 'components/Input-Label/Input-Label';
import { MfcText } from 'components/Text/Text';
import colors from 'styles/colors';
import { InputStyle } from 'styles/input';

import { TimeInputProps } from './Time-Input.interface';

export const TimeInput: React.FC<TimeInputProps> = props => {
  const [showDatePicker, toggleShowPicker] = useState(false);

  function openTimePicker() {
    toggleShowPicker(true);
  }

  function onTimeChange(event: Event, date?: Date) {
    toggleShowPicker(false);
    if (date) {
      props.onChange(date);
    }
  }

  return (
    <View style={props.style}>
      {props.label && <InputLabel label={props.label} />}
      <TouchableOpacity
        onPress={openTimePicker}
        style={[InputStyle.input, props.value ? InputStyle.filledInput : InputStyle.emptyInput]}>
        <MfcText style={[InputStyle.text, props.value ? { color: colors.black } : { color: colors.mainGray }]}>
          {props.value ? dayjs(props.value).format('HH:mm') : props.placeholder}
        </MfcText>
      </TouchableOpacity>
      {showDatePicker && <DateTimePicker value={new Date()} mode="time" onChange={onTimeChange} />}
    </View>
  );
};
