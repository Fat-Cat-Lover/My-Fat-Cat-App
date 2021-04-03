import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChoosePhoto } from 'pages/Add-Cat/Choose-Photo/Choose-Photo';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';

export type AddCatNavParams = {
  ChoosePhoto: undefined;
};

const Stack = createStackNavigator<AddCatNavParams>();

export const AddCatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <HeaderBar>新增寵物</HeaderBar>,
        headerLeft: () => null,
      }}>
      <Stack.Screen name="ChoosePhoto" component={ChoosePhoto} />
    </Stack.Navigator>
  );
};
