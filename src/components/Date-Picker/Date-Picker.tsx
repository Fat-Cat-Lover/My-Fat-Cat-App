import React from 'react';
import dayjs from 'dayjs';
import { View } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { DatePickerStyle } from './Date-Picker.style';
import { DatePickerProps } from './Date-Picker.interface';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class DatePicker extends React.Component<DatePickerProps, { showDatePicker: boolean }> {
  constructor(props: DatePickerProps) {
    super(props);
    this.state = {
      showDatePicker: false,
    };
    this.moveToNextDay = this.moveToNextDay.bind(this);
    this.moveToPreviousDay = this.moveToPreviousDay.bind(this);
    this.openTimePicker = this.openTimePicker.bind(this);
  }

  moveToNextDay() {
    if (this.props.onDateChange) {
      const nextDay = dayjs(this.props.currentTime).add(1, 'day').toDate();
      this.props.onDateChange(nextDay);
    }
  }

  moveToPreviousDay() {
    if (this.props.onDateChange) {
      const preDay = dayjs(this.props.currentTime).subtract(1, 'day').toDate();
      this.props.onDateChange(preDay);
    }
  }

  openTimePicker() {
    this.setState({
      showDatePicker: true,
    });
  }

  onDateChange(event: Event, date?: Date) {
    if (date) {
      if (this.props.onDateChange) {
        this.props.onDateChange(date);
      }
    }
    this.setState({
      showDatePicker: false,
    });
  }

  render() {
    return (
      <View style={DatePickerStyle.container}>
        <TouchableOpacity onPress={this.moveToPreviousDay}>
          <MfcIcon name="keyboardArrowLeft" />
        </TouchableOpacity>
        <TouchableOpacity style={DatePickerStyle.datePicker} onPress={this.openTimePicker}>
          <MfcHeaderText type="regular" size="small">
            {dayjs(this.props.currentTime).format('YYYY/MM/DD')}
          </MfcHeaderText>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.moveToNextDay}>
          <MfcIcon name="keyboardArrowRight" />
        </TouchableOpacity>
        {this.state.showDatePicker && (
          <DateTimePicker
            value={this.props.currentTime}
            mode="date"
            onChange={(event, date) => this.onDateChange(event, date)}
          />
        )}
      </View>
    );
  }
}
