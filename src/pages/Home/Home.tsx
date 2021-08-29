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
import { addExerciseTime, addMemo } from 'redux/diary/slice';
import { selectDiary } from 'redux/diary/selector';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { getSelectedCat, selectCats } from 'redux/cats/selector';
import { HomeProps } from './Home.interface';
import { useState } from 'react';
import { ExerciseModal } from 'components/Exercise-Modal/Exercise-Modal';
import { useEffect } from 'react';
import { MfcTextArea } from 'components/Text-Area/Mfc-Text-Area';
import { addDailyMemo, updateDailyMemo } from 'services/diary';
import { ScrollView } from 'react-native-gesture-handler';
import colors from 'styles/colors';

export const Home: React.FC<HomeProps> = props => {
  const currentDate = useRootSelector(selectDiaryDate);
  const cats = useRootSelector(selectCats);
  const selectedCat = useRootSelector(getSelectedCat);
  const diary = useRootSelector(selectDiary);
  const dispatch = useRootDispatch();
  const currentCat = cats[selectedCat!];
  const [showExerciseModal, toggleShowExerciseModal] = useState<boolean>(false);
  const [memo, setMemo] = useState<string>();

  useEffect(() => {
    if (diary && diary.memo) {
      setMemo(diary.memo.memo);
    } else {
      setMemo('');
    }
  }, [diary]);

  function navToAddCat() {
    props.navigation.navigate('AddCat', { screen: 'ChoosePhoto' });
  }

  // async function onDateChange(date: Date) {
  //   await dispatch(getCurrentDiary({ catId: cats[selectedCat].id, date }));
  // }

  // function onCatSelect(index: number) {
  //   dispatch(getCurrentDiary({ catId: cats[index].id, date: new Date(currentDate) }));
  // }

  function addExercise(time: number) {
    dispatch(addExerciseTime({ catId: cats[selectedCat!].id, createdTime: new Date(currentDate), exerciseTime: time }));
    toggleShowExerciseModal(false);
  }

  async function handleMemoSubmit(newMemo?: string) {
    if (diary && diary.memo) {
      await updateDailyMemo(diary.memo.id, newMemo ? newMemo : '');
      dispatch(addMemo({ id: diary.memo.id, memo }));
    } else {
      const result = await addDailyMemo(cats[selectedCat!].id, new Date(currentDate), newMemo ? newMemo : '');
      dispatch(addMemo(result));
    }
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
        // onCatSelect={onCatSelect}
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
                  date: currentDate,
                  catId: cats[selectedCat!].id,
                  remainCalroies: currentCat.dailyCalories - (diary?.caloriesEatenToday || 0),
                })
              }
            />
          </View>
          <View>
            <MfcTextArea
              value={memo}
              onChange={value => setMemo(value)}
              onBlur={() => handleMemoSubmit(memo)}
              inputStyle={{ backgroundColor: colors.lightWhite }}
              placeholder="點此可自行輸入文字，例如今日預定事項等"
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
        <DatePicker />
      </HeaderBar>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {mainContent}
      </ScrollView>
    </View>
  );
};
