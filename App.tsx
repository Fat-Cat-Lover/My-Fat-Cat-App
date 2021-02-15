/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from './src/styles/colors';
import { MfcIcon } from './src/components/MFC-Icon/MFC-Icon';
import { HomeNavigator } from './src/navigations/home-navigator';
import { DiaryNavigator } from './src/navigations/diary-navigator';
import { PetsNavigator } from './src/navigations/pets-navigator';
import { SettingNavigator } from './src/navigations/settings-navigator';

declare const global: { HermesInternal: null | {} };

const tabIcon: { [key: string]: 'home' | 'bookmark' | 'pet' | 'setting' } = {
  Home: 'home',
  Diary: 'bookmark',
  Pets: 'pet',
  Setting: 'setting',
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
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
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = tabIcon[route.name];
            return <MfcIcon name={iconName} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.darkOrange,
          inactiveTintColor: Colors.lightGray,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarLabel: '首頁',
          }}
        />
        <Tab.Screen name="Diary" component={DiaryNavigator} options={{ tabBarLabel: '日記' }} />
        <Tab.Screen name="Pets" component={PetsNavigator} options={{ tabBarLabel: '寵物' }} />
        <Tab.Screen name="Setting" component={SettingNavigator} options={{ tabBarLabel: '設定' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
