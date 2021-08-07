import React, { useCallback, useEffect } from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from 'styles/colors';
import { TabBar, TabNavParams } from 'navigations/Tab-Bar/Tab-Bar';
import { AddCatStack } from 'navigations/Stacks/Add-Cat';
import { AddCatNavParams } from './Stacks/Add-Cat';
import { EditCatPage } from 'pages/Edit-Cat/Edit-Cat';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import RNBootSplash from 'react-native-bootsplash';
import { getCats } from 'redux/cats/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { getCurrentDiary } from 'redux/diary/slice';
import { selectCats } from 'redux/cats/selector';
import { OnBoarding } from 'pages/On-Boarding/pages/On-Boarding';
import { Loading } from 'components/Loading/Loading';
import { selectLoading } from 'redux/loading/selector';
import { ContactUs } from 'pages/Contact-Us/Contact-Us';
import { AddCustomFood } from 'pages/Eating-Record/Add-Custom-Food/Add-Custom-Food';
import { AddEatingRecord } from 'pages/Eating-Record/Add-Eating-Record/Add-Eating-Record';

export type RootNavParams = {
  TabBar: NavigatorScreenParams<TabNavParams>;
  AddCat: NavigatorScreenParams<AddCatNavParams>;
  EditCat: { catId: number };
  AddEatingRecord: {
    date?: string;
    catId?: number;
    remainCalroies?: number;
    newCustomFood?: {
      foodType: string;
      brand: string;
      foodName: string;
    };
  };
  AddCustomFood: undefined;
  onBoard: undefined;
  contactUs: undefined;
};

const Stack = createStackNavigator<RootNavParams>();

export const MfcNavigation = () => {
  const dispatch = useRootDispatch();
  const cats = useRootSelector(selectCats);
  const isLoading = useRootSelector(selectLoading);

  const init = useCallback(async () => {
    await dispatch(getCats());
    RNBootSplash.hide({ fade: true });
  }, [dispatch]);

  useEffect(() => {
    init();
  }, []);

  let initRoute: React.ReactNode;

  if (cats && cats.length > 0) {
    initRoute = (
      <>
        <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false }} />
        <Stack.Screen name="AddCat" component={AddCatStack} options={{ headerShown: false }} />
        <Stack.Screen
          name="EditCat"
          component={EditCatPage}
          options={{ header: () => <HeaderBar>編輯寵物資訊</HeaderBar> }}
        />
        <Stack.Screen
          name="AddEatingRecord"
          component={AddEatingRecord}
          options={({ route }) => ({
            header: () => <HeaderBar>餵 {cats.find(cat => cat.id === route.params.catId)!.name} 吃飯</HeaderBar>,
          })}
        />
        <Stack.Screen
          name="AddCustomFood"
          component={AddCustomFood}
          options={{ header: () => <HeaderBar>新增自定義食物資訊</HeaderBar> }}
        />
        <Stack.Screen
          name="contactUs"
          component={ContactUs}
          options={{ header: () => <HeaderBar>聯絡我們</HeaderBar> }}
        />
      </>
    );
  } else {
    initRoute = (
      <>
        <Stack.Screen name="onBoard" component={OnBoarding} options={{ headerShown: false }} />
        <Stack.Screen name="AddCat" component={AddCatStack} options={{ headerShown: false }} />
      </>
    );
  }

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
      <Stack.Navigator>{initRoute}</Stack.Navigator>
      <Loading show={isLoading} />
    </NavigationContainer>
  );
};
