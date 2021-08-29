import React from 'react';
import { Image, View } from 'react-native';
import { selectDiary } from 'redux/diary/selector';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { CatDiary } from 'components/Cat-Diary-Panel/Cat-Diary-Panel';
import { DatePicker } from 'components/Date-Picker/Date-Picker';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { EatingRecord } from 'pages/Diary/components/Eating-Record/Eating-Record';
import { MfcText } from 'components/Text/Text';
import { DiaryStyle } from './Diary.style';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonStyle } from 'styles/common-style';
import { NutritionBlock } from '../components/Nutrition-Block/Nutrition-Block';
import { MfcButton } from 'components/Button/Button';
import { getCurrentDiary } from 'redux/diary/slice';
import { selectDiaryDate } from 'redux/diary-date/selector';
import { DiaryProps } from './Diary.interface';

export const Diary: React.FC<DiaryProps> = props => {
  const cats = useRootSelector(state => state.cats.cats);
  const currentDate = useRootSelector(selectDiaryDate);
  const selectedCat = useRootSelector(state => state.cats.selectedCat);
  const diary = useRootSelector(selectDiary);
  const dispatch = useRootDispatch();

  // function onDateChange(date: Date) {
  //   dispatch(getCurrentDiary({ catId: cats[selectedCat].id, date }));
  // }

  // function onCatSelect(index: number) {
  //   dispatch(getCurrentDiary({ catId: cats[index].id, date: new Date(currentDate) }));
  // }

  let content: React.ReactNode;
  if (diary && diary.records.length > 0) {
    content = (
      <ScrollView
        style={DiaryStyle.diaryContainer}
        contentContainerStyle={DiaryStyle.diaryContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {diary.records
          .sort((a, b) => a.createdTime.getTime() - b.createdTime.getTime())
          .map(record => (
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
    if (diary.caloriesEatenToday > cats[selectedCat!].dailyCalories) {
      caloriesSummary = (
        <MfcText type="medium">
          超量進食：{(diary.caloriesEatenToday - cats[selectedCat!].dailyCalories).toFixed(2)} cal
        </MfcText>
      );
    } else if (diary.caloriesEatenToday < cats[selectedCat!].dailyCalories) {
      caloriesSummary = (
        <MfcText>尚未進食：{(cats[selectedCat!].dailyCalories - diary.caloriesEatenToday).toFixed(2)} cal</MfcText>
      );
    } else {
      caloriesSummary = <MfcText>吃飽啦！</MfcText>;
    }
  }

  return (
    <View style={DiaryStyle.container}>
      <HeaderBar>
        <DatePicker />
      </HeaderBar>
      <CatDiary
        cats={cats}
        DiaryHeaderRight={caloriesSummary}
        // onCatSelect={onCatSelect}
        addButtonOnPress={() => props.navigation.navigate('AddCat', { screen: 'ChoosePhoto' })}>
        {content}
        <View style={DiaryStyle.bottomButtonContainer}>
          <MfcButton
            color="green"
            style={DiaryStyle.bottomButton}
            onPress={() => props.navigation.navigate('WeightRecord', { catId: cats[selectedCat!].id })}>
            體重記錄
          </MfcButton>
          <View style={DiaryStyle.bottomButtonSpacing} />
          <MfcButton
            color="lightOrange"
            style={DiaryStyle.bottomButton}
            onPress={() =>
              props.navigation.navigate('AddEatingRecord', {
                date: currentDate,
                catId: cats[selectedCat!].id,
                remainCalroies: cats[selectedCat!].dailyCalories - (diary?.caloriesEatenToday || 0),
              })
            }>
            餵食
          </MfcButton>
        </View>
      </CatDiary>
    </View>
  );
};
