import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';

import Colors from 'styles/colors';
import { TabBar, TabNavParams } from 'navigations/Tab-Bar/Tab-Bar';
import { AddCatStack } from 'navigations/Stacks/Add-Cat';
import { createStackNavigator } from '@react-navigation/stack';
import { AddCatNavParams } from './Stacks/Add-Cat';
import { EditCatPage } from 'pages/Edit-Cat/Edit-Cat';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { AddEatingRecordNavParams, AddEatingRecordStack } from './Stacks/Add-Eating-Record';

export type RootNavParams = {
  TabBar: NavigatorScreenParams<TabNavParams>;
  AddCat: NavigatorScreenParams<AddCatNavParams>;
  EditCat: { catId: number };
  AddEatingRecord: NavigatorScreenParams<AddEatingRecordNavParams>;
};

const Stack = createStackNavigator<RootNavParams>();

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
      <Stack.Screen
        name="EditCat"
        component={EditCatPage}
        options={{ header: () => <HeaderBar>編輯寵物資訊</HeaderBar> }}
      />
      <Stack.Screen name="AddEatingRecord" component={AddEatingRecordStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
