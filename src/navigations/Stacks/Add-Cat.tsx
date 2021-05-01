import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChoosePhoto } from 'pages/Add-Cat/Choose-Photo/Choose-Photo';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { AddBasicProfile } from 'pages/Add-Cat/Add-Basic-Profile/Add-Basic-Profile';
import { DefaultCatsImages } from 'common/default-cat-images';
import { AddOptionalProfile } from 'pages/Add-Cat/Add-Optional-Profile/Add-Optional-Profile';

export type AddCatNavParams = {
  ChoosePhoto: undefined;
  AddBasicProfile: { photo?: string; useDefault?: keyof typeof DefaultCatsImages } | undefined;
  AddOptionalProfile: {
    name: string;
    age: number;
    sex: 'male' | 'female';
    currentWeight: number;
    targetWeight: number;
  };
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
      <Stack.Screen name="AddOptionalProfile" component={AddOptionalProfile} />
    </Stack.Navigator>
  );
};
