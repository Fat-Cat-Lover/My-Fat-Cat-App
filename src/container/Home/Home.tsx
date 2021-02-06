import { DatePicker } from 'components/Date-Picker/Date-Picker';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import React, { Component } from 'react';
import { View } from 'react-native';

export class Home extends Component {
  date = new Date();
  constructor(props: any) {
    super(props);
  }

  getDiary(date: Date) {}

  render() {
    return (
      <View>
        <HeaderBar>
          <DatePicker currentTime={this.date} onDateChange={newDate => this.getDiary(newDate)} />
        </HeaderBar>
      </View>
    );
  }
}
