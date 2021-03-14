/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'reflect-metadata';
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import Colors from './src/styles/colors';
import { TabBar } from 'navigations/Tab-Bar/Tab-Bar';
import { store } from 'redux/store';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <Provider store={store}>
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
        <TabBar />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
