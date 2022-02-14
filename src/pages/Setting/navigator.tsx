import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Setting } from './Setting';
import { CustomFoodList } from '../Custom-Food/Custom-Food-List/Custom-Food-List';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { SettingStackParams } from './navigation.params';

const Stack = createStackNavigator<SettingStackParams>();

export const SettingStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="setting" component={Setting} options={{ header: () => <HeaderBar>設定</HeaderBar> }} />
    <Stack.Screen
      name="customFoodList"
      component={CustomFoodList}
      options={{ header: () => <HeaderBar>自定義食物資訊列表</HeaderBar> }}
    />
  </Stack.Navigator>
);
