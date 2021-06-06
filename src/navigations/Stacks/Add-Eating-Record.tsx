import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddEatingRecord } from 'pages/Eating-Record/Add-Eating-Record/Add-Eating-Record';
import { Cat } from 'models/cat';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';

export type AddEatingRecordNavParams = {
  addEatingRecord: { date: Date; cat: Cat };
};

const Stack = createStackNavigator<AddEatingRecordNavParams>();

export const AddEatingRecordStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="addEatingRecord"
        component={AddEatingRecord}
        options={({ route }) => ({
          header: () => <HeaderBar>餵 {route.params.cat.name} 吃飯</HeaderBar>,
        })}
      />
    </Stack.Navigator>
  );
};
