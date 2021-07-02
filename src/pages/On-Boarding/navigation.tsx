import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Step1 } from './pages/Step1/Step1';
import { Step2 } from './pages/Step2/Step2';
import { Step3 } from './pages/Step3/Step3';

const Stack = createStackNavigator();

export const OnBoardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="step1" component={Step1} />
    <Stack.Screen name="step2" component={Step2} />
    <Stack.Screen name="step3" component={Step3} />
  </Stack.Navigator>
);
