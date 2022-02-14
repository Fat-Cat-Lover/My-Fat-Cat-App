import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Colors from 'styles/colors';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { TabBarStyle } from './Tab-Bar.style';
import { MfcText } from 'components/Text/Text';
import { Home } from 'pages/Home/Home';
import { Pets } from 'pages/Pets/Pets';
import { DiaryStack, DiaryStackParams } from 'pages/Diary/navigation';
import { SettingStack } from 'pages/Setting/navigator';
import { SettingStackParams } from 'pages/Setting/navigation.params';
import { NavigatorScreenParams } from '@react-navigation/native';

export type TabNavParams = {
  Home: undefined;
  DiaryStack: NavigatorScreenParams<DiaryStackParams>;
  Pets: undefined;
  SettingStack: NavigatorScreenParams<SettingStackParams>;
};

function createTabLabel(props: { focused: boolean; color: string; position: LabelPosition }, labelName: string) {
  return (
    <View style={TabBarStyle.label}>
      <MfcText size="normal" type="medium" style={{ color: props.color }}>
        {labelName}
      </MfcText>
    </View>
  );
}

function createTabIcon(
  props: { focused: boolean; color: string; size: number },
  iconName: 'home' | 'bookmark' | 'pet' | 'setting'
) {
  return <MfcIcon name={iconName} style={{ tintColor: props.color }} />;
}

const Tab = createBottomTabNavigator();

export const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.darkOrange,
        tabBarInactiveTintColor: Colors.lightGray,
        tabBarStyle: TabBarStyle.container,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: props => createTabLabel(props, '首頁'),
          tabBarIcon: props => createTabIcon(props, 'home'),
        }}
      />
      <Tab.Screen
        name="DiaryStack"
        component={DiaryStack}
        options={{
          tabBarLabel: props => createTabLabel(props, '日記'),
          tabBarIcon: props => createTabIcon(props, 'bookmark'),
        }}
      />
      <Tab.Screen
        name="Pets"
        component={Pets}
        options={{
          tabBarLabel: props => createTabLabel(props, '寵物'),
          tabBarIcon: props => createTabIcon(props, 'pet'),
        }}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{
          tabBarLabel: props => createTabLabel(props, '設定'),
          tabBarIcon: props => createTabIcon(props, 'setting'),
        }}
      />
    </Tab.Navigator>
  );
};
