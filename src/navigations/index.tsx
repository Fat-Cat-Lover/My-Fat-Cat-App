import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';

import Colors from 'styles/colors';
import { TabBar, TabNavParams } from 'navigations/Tab-Bar/Tab-Bar';
import { AddCatStack } from 'navigations/Stacks/Add-Cat';
import { createStackNavigator } from '@react-navigation/stack';
import { AddCatNavParams } from './Stacks/Add-Cat';

export type RootNavParams = TabNavParams & {
  AddCat: NavigatorScreenParams<AddCatNavParams>;
};

const Stack = createStackNavigator();

export const MfcNavigation = () => (
  <NavigationContainer
    theme={{
      dark: false,
      colors: {
        primary: Colors.darkOrange,
        background: Colors.mainWhite,
        card: Colors.lightWhite,
        text: Colors.darkGray,
        border: Colors.lightWhite,
        notification: Colors.darkOrange,
      },
    }}>
    <Stack.Navigator>
      <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false }} />
      <Stack.Screen name="AddCat" component={AddCatStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
