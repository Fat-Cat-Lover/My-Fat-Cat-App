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
import { EatingRecord } from 'components/Eating-Record/Eating-Record';
import { MfcText } from 'components/Text/Text';
import { DiaryStyle } from './Diary.style';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonStyle } from 'styles/common-style';

export const Diary: React.FC = props => {
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
      <View style={DiaryStyle.diaryContent}>
        {diary.records.map(record => (
          <ScrollView key={record.id} contentContainerStyle={DiaryStyle.eatingRecord}>
            <EatingRecord record={record} />
          </ScrollView>
        ))}
      </View>
    );
  } else {
    content = (
      <View style={DiaryStyle.noFoodCatContainer}>
        <Image source={require('assets/images/others/no-food.png')} />
        <MfcText style={[CommonStyle.grayText, DiaryStyle.noFoodText]}>他可能餓壞了？快去餵食</MfcText>
      </View>
    );
  }

  return (
    <View style={DiaryStyle.container}>
      <HeaderBar>
        <DatePicker onDateChange={onDateChange} />
      </HeaderBar>
      <CatDiary cats={cats} onCatSelect={onCatSelect}>
        {content}
      </CatDiary>
    </View>
  );
};
