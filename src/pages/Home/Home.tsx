import { CatDiary } from 'components/Cat-Diary-Panel/Cat-Diary-Panel';
import { DatePicker } from 'components/Date-Picker/Date-Picker';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { ProgressButton } from 'components/Progress-Button/Progress-Button';
import { MfcText } from 'components/Text/Text';
import { MockCats } from 'mocks/cats';
import { Cat } from 'models/cat';
import React, { Component } from 'react';
import { View } from 'react-native';
import { HomeStyles } from './Home.style';

export class Home extends Component<{}, { date: Date; cats: Cat[]; selectedCat: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      date: new Date(),
      cats: [],
      selectedCat: 0,
    };
  }

  componentDidMount() {
    const cats = this.getCats();
    this.setState({ cats });
  }

  getCats(): Cat[] {
    return MockCats;
  }

  getDiary(catId: number, date: Date) {
    return;
  }

  onDateChange(newDate: Date) {
    this.setState({ date: newDate });
    this.getDiary(this.state.cats[this.state.selectedCat].id, newDate);
  }

  onCatSelect(index: number) {
    this.setState({ selectedCat: index });
    this.getDiary(this.state.cats[index].id, this.state.date);
  }

  render() {
    return (
      <View>
        <HeaderBar>
          <DatePicker currentTime={this.state.date} onDateChange={newDate => this.onDateChange(newDate)} />
        </HeaderBar>
        <CatDiary cats={this.state.cats} onCatSelect={cat => this.onCatSelect(cat)}>
          <View style={HomeStyles.diaryContent}>
            <MfcText>體重(kg): </MfcText>
            <View style={HomeStyles.dailySummaryContainer}>
              <ProgressButton
                icon="sport"
                progress={10 / 30}
                progressText="10/30 Mins"
                progressBarColor="#2EC4B6"
                buttonText="運動"
                buttonColor="green"
              />
              <View style={HomeStyles.SummarySpacing} />
              <ProgressButton
                icon="food"
                progress={1600 / 3200}
                progressText="1600/3200 Cal"
                progressBarColor="#FF9F1C"
                buttonText="餵食"
                buttonColor="primary"
              />
            </View>
          </View>
          <View />
        </CatDiary>
      </View>
    );
  }
}
