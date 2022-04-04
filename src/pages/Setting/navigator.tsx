import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Setting } from './Setting';
import { CustomFoodList } from '../Custom-Food/Custom-Food-List/Custom-Food-List';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { SettingStackParams } from './navigation.params';
import colors from 'styles/colors';

const Stack = createStackNavigator<SettingStackParams>();

export const SettingStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="setting" component={Setting} options={{ header: () => <HeaderBar>設定</HeaderBar> }} />
    <Stack.Screen
      name="customFoodList"
      component={CustomFoodList}
      options={{
        title: '自定義食物資訊列表',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontFamily: 'NotoSansTC-Regular', color: colors.black, fontSize: 18, lineHeight: 18 * 1.4 },
      }}
    />
  </Stack.Navigator>
);
