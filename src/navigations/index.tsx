import React, { useCallback, useEffect } from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';

import Colors from 'styles/colors';
import { TabBar, TabNavParams } from 'navigations/Tab-Bar/Tab-Bar';
import { AddCatStack } from 'navigations/Stacks/Add-Cat';
import { createStackNavigator } from '@react-navigation/stack';
import { AddCatNavParams } from './Stacks/Add-Cat';
import { EditCatPage } from 'pages/Edit-Cat/Edit-Cat';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { AddEatingRecordNavParams, AddEatingRecordStack } from './Stacks/Add-Eating-Record';
import { OnBoardStack } from 'pages/On-Boarding/navigation';
import RNBootSplash from 'react-native-bootsplash';
import { getCats } from 'redux/cats/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { getCurrentDiary } from 'redux/diary/slice';
import { checkOnboard } from 'redux/on-board/slice';
import { selectCats } from 'redux/cats/selector';

export type RootNavParams = {
  TabBar: NavigatorScreenParams<TabNavParams>;
  AddCat: NavigatorScreenParams<AddCatNavParams>;
  EditCat: { catId: number };
  AddEatingRecord: NavigatorScreenParams<AddEatingRecordNavParams>;
  onBoard: undefined;
};

const Stack = createStackNavigator<RootNavParams>();

export const MfcNavigation = () => {
  const dispatch = useRootDispatch();
  // const onBoard = useRootSelector(state => state.onBoard.finish);
  const cats = useRootSelector(selectCats);

  const init = useCallback(async () => {
    // await dispatch(checkOnboard());
    await dispatch(getCats()).then(result => {
      const _cats = unwrapResult(result);
      if (_cats.length) {
        dispatch(getCurrentDiary({ catId: _cats[0].id, date: new Date() }));
      }
    });
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
        <Stack.Screen name="AddEatingRecord" component={AddEatingRecordStack} options={{ headerShown: false }} />
      </>
    );
  } else {
    initRoute = (
      <>
        <Stack.Screen name="onBoard" component={OnBoardStack} options={{ headerShown: false }} />
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
    </NavigationContainer>
  );
};
