import React, { useState } from 'react';
import dayjs from 'dayjs';
import { View } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { DatePickerStyle } from './Date-Picker.style';
import { DatePickerProps } from './Date-Picker.interface';
import { TouchableOpacity } from 'react-native';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { setDiaryDate } from 'redux/diary-date/slice';
import { selectDiaryDate } from 'redux/diary-date/selector';

export const DatePicker: React.FC<DatePickerProps> = props => {
  const currentDate = dayjs(useRootSelector(selectDiaryDate));
  const dispatch = useRootDispatch();
  const [showDatePicker, toggleShowPicker] = useState(false);

  function moveToNextDay() {
    const nextDay = currentDate.add(1, 'day');
    dispatch(setDiaryDate(nextDay.toISOString()));
    if (props.onDateChange) {
      props.onDateChange(nextDay.toDate());
    }
  }

  function moveToPreviousDay() {
    const preDay = currentDate.subtract(1, 'day');
    dispatch(setDiaryDate(preDay.toISOString()));
    if (props.onDateChange) {
      props.onDateChange(preDay.toDate());
    }
  }

  function openTimePicker() {
    toggleShowPicker(true);
  }

  function onDateChange(event: Event, newDate?: Date) {
    toggleShowPicker(false);
    if (newDate && newDate.getTime() / 1000 !== currentDate.unix()) {
      dispatch(setDiaryDate(newDate.toISOString()));
      if (props.onDateChange) {
        props.onDateChange(newDate);
      }
    }
  }

  return (
    <View style={DatePickerStyle.container}>
      <TouchableOpacity onPress={moveToPreviousDay}>
        <MfcIcon name="keyboardArrowLeft" />
      </TouchableOpacity>
      <TouchableOpacity style={DatePickerStyle.datePicker} onPress={openTimePicker}>
        <MfcHeaderText type="regular" size="small">
          {currentDate.format('YYYY/MM/DD')}
        </MfcHeaderText>
      </TouchableOpacity>
      <TouchableOpacity onPress={moveToNextDay}>
        <MfcIcon name="keyboardArrowRight" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={currentDate.toDate()}
          mode="date"
          onChange={(event, date) => onDateChange(event, date)}
        />
      )}
    </View>
  );
};
