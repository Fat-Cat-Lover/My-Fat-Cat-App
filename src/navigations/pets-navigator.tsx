import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const PetsStack = createStackNavigator();

export const PetsNavigator = () => {
  return (
    <PetsStack.Navigator>
      <PetsStack.Screen name="Pets" component={} />
    </PetsStack.Navigator>
  );
};
