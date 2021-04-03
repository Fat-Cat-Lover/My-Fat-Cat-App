import React from 'react';
import { Image, View } from 'react-native';
import { selectDiaryDate } from 'redux/diary-date/selector';
import { selectDiary } from 'redux/diary/selector';
import { setCurrentDiary } from 'redux/diary/slice';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { CatDiary } from 'components/Cat-Diary-Panel/Cat-Diary-Panel';
import { DatePicker } from 'components/Date-Picker/Date-Picker';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { getDiary } from 'services/diary';
import { EatingRecord } from 'pages/Diary/components/Eating-Record/Eating-Record';
import { MfcText } from 'components/Text/Text';
import { DiaryStyle } from './Diary.style';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonStyle } from 'styles/common-style';
import { NutritionBlock } from './components/Nutrition-Block/Nutrition-Block';
import { MfcButton } from 'components/Button/Button';

export const Diary: React.FC = () => {
  const currentDate = useRootSelector(selectDiaryDate);
  const cats = useRootSelector(state => state.cats.cats);
  const selectedCat = useRootSelector(state => state.cats.selectedCat);
  const diary = useRootSelector(selectDiary);
  const dispatch = useRootDispatch();

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

  let content: React.ReactNode;
  if (diary && diary.records.length > 0) {
    content = (
      <ScrollView style={DiaryStyle.diaryContainer} contentContainerStyle={DiaryStyle.diaryContent}>
        {diary.records.map(record => (
          <View key={record.id} style={DiaryStyle.eatingRecord}>
            <EatingRecord record={record} />
          </View>
        ))}
        <View style={DiaryStyle.nutritionCotainer}>
          <View style={DiaryStyle.nutritionBlock}>
            <NutritionBlock
              title="碳水化合物"
              weight={diary.records.reduce((pre, record) => {
                return pre + (record.carbohydrate || 0);
              }, 0)}
            />
            <NutritionBlock
              title="蛋白質"
              weight={diary.records.reduce((pre, record) => {
                return pre + (record.crudeProtein || 0);
              }, 0)}
            />
            <NutritionBlock
              title="脂肪"
              weight={diary.records.reduce((pre, record) => {
                return pre + (record.crudeFat || 0);
              }, 0)}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    content = (
      <View style={DiaryStyle.noFoodContainer}>
        <Image source={require('assets/images/others/no-food.png')} />
        <MfcText style={[CommonStyle.grayText, DiaryStyle.noFoodText]}>他可能餓壞了？快去餵食</MfcText>
      </View>
    );
  }

  let caloriesSummary: React.ReactNode;
  if (cats.length > 0 && diary) {
    if (diary.caloriesEatenToday > cats[selectedCat].dailyCalories) {
      caloriesSummary = (
        <MfcText type="medium">超量進食：{diary.caloriesEatenToday - cats[selectedCat].dailyCalories} cal</MfcText>
      );
    } else if (diary.caloriesEatenToday < cats[selectedCat].dailyCalories) {
      caloriesSummary = <MfcText>尚未進食：{cats[selectedCat].dailyCalories - diary.caloriesEatenToday} cal</MfcText>;
    } else {
      caloriesSummary = <MfcText>吃飽啦！</MfcText>;
    }
  }

  return (
    <View style={DiaryStyle.container}>
      <HeaderBar>
        <DatePicker onDateChange={onDateChange} />
      </HeaderBar>
      <CatDiary cats={cats} onCatSelect={onCatSelect} DiaryHeaderRight={caloriesSummary}>
        {content}
        <View style={DiaryStyle.bottomButtonContainer}>
          <MfcButton color="green" style={DiaryStyle.bottomButton}>
            體重記錄
          </MfcButton>
          <View style={DiaryStyle.bottomButtonSpacing} />
          <MfcButton color="lightOrange" style={DiaryStyle.bottomButton}>
            餵食
          </MfcButton>
        </View>
      </CatDiary>
    </View>
  );
};
