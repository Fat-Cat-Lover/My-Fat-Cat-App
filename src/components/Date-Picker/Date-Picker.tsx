import React from 'react';
import dayjs from 'dayjs';
import { View } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { DatePickerStyle } from './Date-Picker.style';
import { DatePickerProps } from './Date-Picker.interface';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class DatePicker extends React.Component<DatePickerProps, { date: dayjs.Dayjs; showDatePicker: boolean }> {
  constructor(props: DatePickerProps) {
    super(props);
    this.state = {
      date: dayjs(props.currentTime),
      showDatePicker: false,
    };
    this.moveToNextDay.bind(this);
    this.moveToPreviousDay.bind(this);
    this.openTimePicker.bind(this);
  }

  moveToNextDay() {
    this.setState({
      date: this.state.date.add(1, 'date'),
    });
    if (this.props.onDateChange) {
      this.props.onDateChange(this.state.date.toDate());
    }
  }

  moveToPreviousDay() {
    this.setState({
      date: this.state.date.subtract(1, 'date'),
    });
    if (this.props.onDateChange) {
      this.props.onDateChange(this.state.date.toDate());
    }
  }

  openTimePicker() {
    this.setState({
      showDatePicker: true,
    });
  }

  onDateChange(event: Event, date?: Date) {
    if (date) {
      this.setState({
        date: dayjs(date),
      });
      if (this.props.onDateChange) {
        this.props.onDateChange(this.state.date.toDate());
      }
    } else {
      this.setState({
        showDatePicker: false,
      });
    }
  }

  render() {
    return (
      <View style={DatePickerStyle.container}>
        <TouchableOpacity onPress={this.moveToPreviousDay}>
          <MfcIcon name="keyboardArrowLeft" />
        </TouchableOpacity>
        <TouchableOpacity style={DatePickerStyle.datePicker} onPress={this.openTimePicker}>
          <MfcHeaderText type="regular" size="small">
            {this.state.date.format('YYYY/MM/DD')}
          </MfcHeaderText>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.moveToNextDay}>
          <MfcIcon name="keyboardArrowRight" />
        </TouchableOpacity>
        {this.state.showDatePicker && (
          <DateTimePicker
            value={this.state.date.toDate()}
            mode="date"
            onChange={(event, date) => this.onDateChange(event, date)}
          />
        )}
      </View>
    );
  }
}
