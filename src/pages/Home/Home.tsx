import React, { useEffect } from 'react';
import { View } from 'react-native';
import { CatDiary } from 'components/Cat-Diary-Panel/Cat-Diary-Panel';
import { DatePicker } from 'components/Date-Picker/Date-Picker';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { ProgressButton } from 'components/Progress-Button/Progress-Button';
import { MfcText } from 'components/Text/Text';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { HomeStyles } from './Home.style';
import { setCats } from 'redux/cats/slice';
import { selectDiaryDate } from 'redux/diary-date/selector';
import { getCats } from 'services/cat';
import { getDiary } from 'services/diary';
import { setCurrentDiary } from 'redux/diary/slice';
import { selectDiary } from 'redux/diary/selector';

export const Home: React.FC = props => {
  const currentDate = useRootSelector(selectDiaryDate);
  const cats = useRootSelector(state => state.cats.cats);
  const selectedCat = useRootSelector(state => state.cats.selectedCat);
  const diary = useRootSelector(selectDiary);
  const dispatch = useRootDispatch();

  useEffect(() => {
    getCats().then(_cats => {
      dispatch(setCats(_cats));
      if (_cats) {
        return getCatDiary(_cats[selectedCat].id, currentDate);
      }
    });
  }, []);

  function getCatDiary(selectCatId: number, date: string) {
    return getDiary(selectCatId, date).then(_diary => {
      dispatch(setCurrentDiary(_diary));
    });
  }

  function onDateChange(newDate: Date) {
    getCatDiary(cats[selectedCat].id, newDate.toISOString());
  }

  function onCatSelect(index: number) {
    getCatDiary(cats[index].id, currentDate);
  }

  return (
    <View style={HomeStyles.container}>
      <HeaderBar>
        <DatePicker onDateChange={onDateChange} />
      </HeaderBar>
      <CatDiary cats={cats} onCatSelect={onCatSelect}>
        <View style={HomeStyles.diaryContent}>
          <MfcText>體重(kg): </MfcText>
          <View style={HomeStyles.dailySummaryContainer}>
            <ProgressButton
              icon="sport"
              progress={(diary?.excerciseTime || 0) / 30}
              progressText={`${diary?.excerciseTime || 0}/30 Mins`}
              progressBarColor="#2EC4B6"
              buttonText="運動"
              buttonColor="green"
            />
            <View style={HomeStyles.SummarySpacing} />
            <ProgressButton
              icon="food"
              progress={(diary?.caloriesEatenToday || 0) / (cats[selectedCat]?.dailyCalories || 0)}
              progressText={`${diary?.caloriesEatenToday || 0}/${cats[selectedCat]?.dailyCalories || 0} Cal`}
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
