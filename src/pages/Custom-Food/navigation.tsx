import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddCustomFood } from './Add-Custom-Food/Add-Custom-Food';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { CustomFoodParams } from './navigation.params';
import { CustomFoodList } from './Custom-Food-List/Custom-Food-List';
import { EditCustomFood } from './Edit-Custom-Food/Edit-Custom-Food';

const Stack = createStackNavigator<CustomFoodParams>();

export const CustomFoodStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="addCustomFood"
      component={AddCustomFood}
      options={{ header: () => <HeaderBar>新增自定義食物資訊</HeaderBar> }}
    />
    <Stack.Screen
      name="customFoodList"
      component={CustomFoodList}
      options={{ header: () => <HeaderBar>自定義食物資訊列表</HeaderBar> }}
    />
    <Stack.Screen
      name="editCustomFood"
      component={EditCustomFood}
      options={{ header: () => <HeaderBar>編輯自定義食物資訊</HeaderBar> }}
    />
  </Stack.Navigator>
);
