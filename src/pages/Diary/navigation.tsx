import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Diary } from './Diary/Diary';
import { WeightRecordPage } from './Weight-Record/Weight-Record';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';

export type DiaryStackParams = {
  Diary: undefined;
  WeightRecord: { catId: number };
};

const Stack = createStackNavigator<DiaryStackParams>();

export const DiaryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Diary" component={Diary} options={{ headerShown: false }} />
      <Stack.Screen
        name="WeightRecord"
        component={WeightRecordPage}
        options={{ header: () => <HeaderBar>體重紀錄</HeaderBar> }}
      />
    </Stack.Navigator>
  );
};
