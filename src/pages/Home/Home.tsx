import React, { useEffect } from 'react';
import { View } from 'react-native';
import { CatDiary } from 'components/Cat-Diary-Panel/Cat-Diary-Panel';
import { DatePicker } from 'components/Date-Picker/Date-Picker';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { ProgressButton } from 'components/Progress-Button/Progress-Button';
import { MfcText } from 'components/Text/Text';
import { MockCats } from 'mocks/cats';
import { Cat } from 'models/cat';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { HomeStyles } from './Home.style';
import { setCats } from 'redux/cats/slice';
import { selectDiaryDate } from 'redux/diary-date/selector';

export const Home: React.FC = props => {
  const currentDate = useRootSelector(selectDiaryDate);
  const cats = useRootSelector(state => state.cats.cats);
  const dispatch = useRootDispatch();
  const selectedCat = useRootSelector(state => state.cats.selectedCat);

  useEffect(() => {
    dispatch(setCats(getCats()));
  }, []);

  function getCats(): Cat[] {
    return MockCats;
  }

  function getDiary(catId: number, date: Date) {
    return;
  }

  function onDateChange(newDate: Date) {
    getDiary(cats[selectedCat].id, newDate);
  }

  function onCatSelect(index: number) {
    getDiary(cats[index].id, currentDate);
  }

  return (
    <View style={HomeStyles.container}>
      <HeaderBar>
        <DatePicker onDateChange={onDateChange} />
      </HeaderBar>
      <CatDiary cats={cats} selectedCat={selectedCat} onCatSelect={onCatSelect}>
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
};
