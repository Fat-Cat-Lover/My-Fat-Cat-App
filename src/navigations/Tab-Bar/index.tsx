import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { IconName } from 'components/MFC-Icon/MFC-icon.interface';
import { DiaryStack, DiaryStackParams } from 'pages/Diary/navigation';
import { Home } from 'pages/Home/Home';
import { Pets } from 'pages/Pets/Pets';
import { SettingStackParams } from 'pages/Setting/navigation.params';
import { SettingStack } from 'pages/Setting/navigator';
import React from 'react';
import { TabBar } from './Tab-Bar';

export type TabNavParams = {
  Home: undefined;
  DiaryStack: NavigatorScreenParams<DiaryStackParams>;
  Pets: undefined;
  SettingStack: NavigatorScreenParams<SettingStackParams>;
};

type TabData = {
  label: string;
  icon: IconName;
}

const tabs: TabData[] = [
  {
    label: '首頁',
    icon: 'home',
  },
  {
    label: '日記',
    icon: 'bookmark',
  },
  {
    label: '寵物',
    icon: 'pet',
  },
  {
    label: '設定',
    icon: 'setting',
  },
];

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} routes={tabs} />}>
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="DiaryStack"
        component={DiaryStack}
      />
      <Tab.Screen
        name="Pets"
        component={Pets}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
      />
    </Tab.Navigator>
  );
};
