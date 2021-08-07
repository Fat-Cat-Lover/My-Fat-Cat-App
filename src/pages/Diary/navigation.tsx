import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Diary } from './Diary/Diary';
import { WeightRecordPage } from './Weight-Record/Weight-Record';
import colors from 'styles/colors';

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
        options={{
          title: '體重紀錄',
          headerTitleStyle: {
            color: colors.black,
            fontSize: 19,
            lineHeight: 18 * 1.4,
          },
          headerTitleAlign: 'center',
          headerStyle: {
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
