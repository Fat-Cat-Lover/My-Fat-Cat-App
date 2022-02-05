import React, { useCallback, useEffect } from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from 'styles/colors';
import { TabBar, TabNavParams } from 'navigations/Tab-Bar/Tab-Bar';
import { EditCatPage } from 'pages/Edit-Cat/Edit-Cat';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import RNBootSplash from 'react-native-bootsplash';
import { getCats } from 'redux/cats/slice';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { getSelectedCat, selectCats } from 'redux/cats/selector';
import { OnBoarding } from 'pages/On-Boarding/pages/On-Boarding';
import { Loading } from 'components/Loading/Loading';
import { selectLoading } from 'redux/loading/selector';
import { ContactUs } from 'pages/Contact-Us/Contact-Us';
import { getCurrentDiary } from 'redux/diary/slice';
import { selectDiaryDate } from 'redux/diary-date/selector';
import { Alert } from 'components/Alert/Alert';
import { Cat } from 'models/cat';
import { EatingRecordParams, EatingRecordStack } from 'pages/Eating-Record/navigation';
import { AddCatNavParams, AddCatStack } from 'pages/Add-Cat/navigator';
import { CustomFoodParams, CustomFoodStack } from 'pages/Custom-Food/navigation';

export type RootNavParams = {
  TabBar: NavigatorScreenParams<TabNavParams>;
  AddCat: NavigatorScreenParams<AddCatNavParams>;
  EditCat: { cat: Cat };
  EatingRecord: NavigatorScreenParams<EatingRecordParams>;
  onBoard: undefined;
  contactUs: undefined;
  CustomFood: NavigatorScreenParams<CustomFoodParams>;
};

const Stack = createStackNavigator<RootNavParams>();

export const MfcNavigation = () => {
  const dispatch = useRootDispatch();
  const cats = useRootSelector(selectCats);
  const selectedCat = useRootSelector(getSelectedCat);
  const isLoading = useRootSelector(selectLoading);
  const currentDate = useRootSelector(selectDiaryDate);

  const init = useCallback(async () => {
    await dispatch(getCats());
    RNBootSplash.hide({ fade: true });
  }, [dispatch]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (selectedCat !== undefined && cats.length > 0 && currentDate) {
      dispatch(getCurrentDiary({ catId: cats[selectedCat].id, date: new Date(currentDate) }));
    }
  }, [selectedCat, currentDate, dispatch]);

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
        <Stack.Screen name="EatingRecord" component={EatingRecordStack} options={{ headerShown: false }} />
        <Stack.Screen name="CustomFood" component={CustomFoodStack} options={{ headerShown: false }} />
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
      <Alert />
    </NavigationContainer>
  );
};
