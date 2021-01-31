import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const SettingStack = createStackNavigator();

export const SettingNavigator = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Setting" component={} />
    </SettingStack.Navigator>
  );
};
