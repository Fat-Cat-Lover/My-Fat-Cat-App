import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChoosePhoto } from 'pages/Add-Cat/Choose-Photo/Choose-Photo';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { AddBasicProfile } from 'pages/Add-Cat/Add-Basic-Profile/Add-Basic-Profile';
import { DefaultCatsImages } from 'common/default-cat-images';
import { AddOptionalProfile } from 'pages/Add-Cat/Add-Optional-Profile/Add-Optional-Profile';
import { AddCatProgressBar } from 'pages/Add-Cat/components/Add-Cat-Progress-Bar/Add-Cat-Progress-Bar';

export type AddCatNavParams = {
  ChoosePhoto: { currentStep?: number };
  AddBasicProfile: { photo?: string; useDefault?: keyof typeof DefaultCatsImages; currentStep?: number } | undefined;
  AddOptionalProfile: {
    name: string;
    age: number;
    sex: 'male' | 'female';
    currentWeight: number;
    targetWeight: number;
    currentStep?: number;
  };
};

const Stack = createStackNavigator<AddCatNavParams>();

export const AddCatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: () => (
          <>
            <HeaderBar>新增寵物</HeaderBar>
            <AddCatProgressBar currnetStep={route.params?.currentStep!} totalStep={3} />
          </>
        ),
        headerLeft: () => null,
      })}>
      <Stack.Screen name="ChoosePhoto" component={ChoosePhoto} initialParams={{ currentStep: 1 }} />
      <Stack.Screen name="AddBasicProfile" component={AddBasicProfile} initialParams={{ currentStep: 2 }} />
      <Stack.Screen name="AddOptionalProfile" component={AddOptionalProfile} initialParams={{ currentStep: 3 }} />
    </Stack.Navigator>
  );
};
