import React from 'react';
import { View } from 'react-native';
import { CatDiary } from 'components/Cat-Diary-Panel/Cat-Diary-Panel';
import { DatePicker } from 'components/Date-Picker/Date-Picker';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { ProgressButton } from 'pages/Home/components/Progress-Button/Progress-Button';
import { MfcText } from 'components/Text/Text';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { HomeStyles } from './Home.style';
import { selectDiaryDate } from 'redux/diary-date/selector';
import { addExerciseTime, getCurrentDiary } from 'redux/diary/slice';
import { selectDiary } from 'redux/diary/selector';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { getSelectedCat, selectCats } from 'redux/cats/selector';
import { HomeProps } from './Home.interface';
import { useState } from 'react';
import { ExerciseModal } from 'components/Exercise-Modal/Exercise-Modal';

export const Home: React.FC<HomeProps> = props => {
  const currentDate = useRootSelector(selectDiaryDate);
  const cats = useRootSelector(selectCats);
  const selectedCat = useRootSelector(getSelectedCat);
  const diary = useRootSelector(selectDiary);
  const dispatch = useRootDispatch();
  const currentCat = cats[selectedCat];
  const [showExerciseModal, toggleShowExerciseModal] = useState<boolean>(false);

  function navToAddCat() {
    props.navigation.navigate('AddCat', { screen: 'ChoosePhoto' });
  }

  async function onDateChange(date: Date) {
    await dispatch(getCurrentDiary({ catId: cats[selectedCat].id, date }));
  }

  function onCatSelect(index: number) {
    dispatch(getCurrentDiary({ catId: cats[index].id, date: new Date(currentDate) }));
  }

  function addExercise(time: number) {
    dispatch(addExerciseTime({ catId: cats[selectedCat].id, createdTime: new Date(currentDate), exerciseTime: time }));
    toggleShowExerciseModal(false);
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
          currentCat.currentWeight !== currentCat.targetWeight ? (
            <MfcText>距離目標：{(currentCat.currentWeight - currentCat.targetWeight).toFixed(2)} kg</MfcText>
          ) : undefined
        }
        addButtonOnPress={navToAddCat}>
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
              onPress={() => toggleShowExerciseModal(true)}
            />
            <View style={HomeStyles.SummarySpacing} />
            <ProgressButton
              icon="food"
              progress={(diary?.caloriesEatenToday || 0) / (currentCat.dailyCalories || 0) || 0}
              progressText={`${diary?.caloriesEatenToday || 0}/${currentCat.dailyCalories || 0} Cal`}
              progressBarColor="#FF9F1C"
              buttonText="餵食"
              buttonColor="primary"
              onPress={() =>
                props.navigation.navigate('AddEatingRecord', {
                  screen: 'addEatingRecord',
                  params: {
                    date: currentDate,
                    catId: cats[selectedCat].id,
                    remainCalroies: currentCat.dailyCalories - diary!.caloriesEatenToday,
                  },
                })
              }
            />
          </View>
        </View>
        <ExerciseModal
          visable={showExerciseModal}
          onClose={() => toggleShowExerciseModal(false)}
          addExerciseTime={addExercise}
        />
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
