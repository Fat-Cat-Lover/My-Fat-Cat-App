import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Setting } from 'pages/Setting/Setting';

const SettingStack = createStackNavigator();

export const SettingNavigator = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Setting" component={Setting} />
    </SettingStack.Navigator>
  );
};
