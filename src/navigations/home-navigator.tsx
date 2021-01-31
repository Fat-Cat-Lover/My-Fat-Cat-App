import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from 'container/Home/Home';

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};
