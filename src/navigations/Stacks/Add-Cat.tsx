import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChoosePhoto } from 'pages/Add-Cat/Choose-Photo/Choose-Photo';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { AddBasicProfile } from 'pages/Add-Cat/Add-Basic-Profile/Add-Basic-Profile';

export type AddCatNavParams = {
  ChoosePhoto: undefined;
  AddBasicProfile: undefined;
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
      <Stack.Screen name="AddBasicProfile" component={AddBasicProfile} />
    </Stack.Navigator>
  );
};
