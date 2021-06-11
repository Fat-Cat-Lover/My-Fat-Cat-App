import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddEatingRecord } from 'pages/Eating-Record/Add-Eating-Record/Add-Eating-Record';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { useRootSelector } from 'redux/hooks';
import { selectCats } from 'redux/cats/selector';

export type AddEatingRecordNavParams = {
  addEatingRecord: { date: string; catId: number; remainCalroies: number };
};

const Stack = createStackNavigator<AddEatingRecordNavParams>();

export const AddEatingRecordStack = () => {
  const cats = useRootSelector(selectCats);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="addEatingRecord"
        component={AddEatingRecord}
        options={({ route }) => ({
          header: () => <HeaderBar>餵 {cats.find(cat => cat.id === route.params.catId)!.name} 吃飯</HeaderBar>,
        })}
      />
    </Stack.Navigator>
  );
};
