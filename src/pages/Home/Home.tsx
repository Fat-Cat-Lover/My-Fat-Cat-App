import React, { useEffect } from 'react';
import { View } from 'react-native';
import { CatDiary } from 'components/Cat-Diary-Panel/Cat-Diary-Panel';
import { DatePicker } from 'components/Date-Picker/Date-Picker';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { ProgressButton } from 'pages/Home/components/Progress-Button/Progress-Button';
import { MfcText } from 'components/Text/Text';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { HomeStyles } from './Home.style';
import { setCats } from 'redux/cats/slice';
import { selectDiaryDate } from 'redux/diary-date/selector';
import { getCats } from 'services/cat';
import { getDiary } from 'services/diary';
import { setCurrentDiary } from 'redux/diary/slice';
import { selectDiary } from 'redux/diary/selector';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { selectCats } from 'redux/cats/selector';

export const Home: React.FC = props => {
  const currentDate = useRootSelector(selectDiaryDate);
  const cats = useRootSelector(selectCats);
  const selectedCat = useRootSelector(state => state.cats.selectedCat);
  const diary = useRootSelector(selectDiary);
  const dispatch = useRootDispatch();
  const currentCat = cats[selectedCat];

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

  let mainContent: React.ReactNode;
  if (currentCat) {
    let weightBlock: React.ReactNode;
    if (currentCat.preWeight) {
      weightBlock = (
        <>
          <MfcText size="large">{currentCat.preWeight}</MfcText>
          <MfcIcon name="arrowRight" style={HomeStyles.weightArrow} />
          <MfcText size="large" type="medium">
            {currentCat.currentWeight}
          </MfcText>
        </>
      );
    } else {
      weightBlock = <MfcText size="large">{currentCat.currentWeight}</MfcText>;
    }
    mainContent = (
      <CatDiary
        cats={cats}
        onCatSelect={onCatSelect}
        DiaryHeaderRight={
          currentCat.currentWeight > currentCat.targetWeight ? (
            <MfcText>距離目標：{currentCat.currentWeight} kg</MfcText>
          ) : undefined
        }>
        <View style={HomeStyles.diaryContent}>
          <View style={HomeStyles.weightTextContainer}>
            <MfcText>體重(kg)：</MfcText>
            <View style={HomeStyles.weightContent}>{weightBlock}</View>
          </View>
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
              progress={(diary?.caloriesEatenToday || 0) / (currentCat.dailyCalories || 0)}
              progressText={`${diary?.caloriesEatenToday || 0}/${currentCat.dailyCalories || 0} Cal`}
              progressBarColor="#FF9F1C"
              buttonText="餵食"
              buttonColor="primary"
            />
          </View>
        </View>
        <View />
      </CatDiary>
    );
  }

  return (
    <View style={HomeStyles.container}>
      <HeaderBar>
        <DatePicker onDateChange={onDateChange} />
      </HeaderBar>
      {mainContent}
    </View>
  );
};
