import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { HomeNavigator } from 'navigations/home-navigator';
import { DiaryNavigator } from 'navigations/diary-navigator';
import { PetsNavigator } from 'navigations/pets-navigator';
import { SettingNavigator } from 'navigations/settings-navigator';
import Colors from 'styles/colors';
import { TabBarStyle } from './Tab-Bar.style';
import { MfcText } from 'components/Text/Text';

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
      tabBarOptions={{
        activeTintColor: Colors.darkOrange,
        inactiveTintColor: Colors.lightGray,
        style: TabBarStyle.container,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: props => createTabLabel(props, '首頁'),
          tabBarIcon: props => createTabIcon(props, 'home'),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryNavigator}
        options={{
          tabBarLabel: props => createTabLabel(props, '日記'),
          tabBarIcon: props => createTabIcon(props, 'bookmark'),
        }}
      />
      <Tab.Screen
        name="Pets"
        component={PetsNavigator}
        options={{
          tabBarLabel: props => createTabLabel(props, '寵物'),
          tabBarIcon: props => createTabIcon(props, 'pet'),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingNavigator}
        options={{
          tabBarLabel: props => createTabLabel(props, '設定'),
          tabBarIcon: props => createTabIcon(props, 'setting'),
        }}
      />
    </Tab.Navigator>
  );
};
