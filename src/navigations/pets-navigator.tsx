import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Pets } from 'pages/Pets/Pets';

const PetsStack = createStackNavigator();

export const PetsNavigator = () => {
  return (
    <PetsStack.Navigator>
      <PetsStack.Screen name="Pets" component={Pets} />
    </PetsStack.Navigator>
  );
};
