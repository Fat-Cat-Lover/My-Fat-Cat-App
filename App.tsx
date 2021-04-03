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
import { store } from 'redux/store';
import { Provider } from 'react-redux';
import { MfcNavigation } from 'navigations';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <Provider store={store}>
      <MfcNavigation />
    </Provider>
  );
};

export default App;
