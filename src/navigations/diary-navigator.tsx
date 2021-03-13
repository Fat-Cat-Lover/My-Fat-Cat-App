import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Diary } from 'pages/Diary/Diary';

const DiaryStack = createStackNavigator();

export const DiaryNavigator = () => {
  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen name="Diary" component={Diary} />
    </DiaryStack.Navigator>
  );
};
