import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const DiaryStack = createStackNavigator();

export const DiaryNavigator = () => {
  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen name="Diary" component={} />
    </DiaryStack.Navigator>
  );
};
