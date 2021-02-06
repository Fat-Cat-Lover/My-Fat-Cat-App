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

import Colors from 'styles/colors';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { HomeNavigator } from 'navigations/home-navigator';

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
    <NavigationContainer>
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
        <Tab.Screen name="Diary" component={} options={{ tabBarLabel: '日記' }} />
        <Tab.Screen name="Pets" component={} options={{ tabBarLabel: '寵物' }} />
        <Tab.Screen name="Setting" component={} options={{ tabBarLabel: '設定' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
