import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddEatingRecord } from './Add-Eating-Record/Add-Eating-Record';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { useRootSelector } from 'redux/hooks';
import { selectCats } from 'redux/cats/selector';
import { EditEatingRecordPage } from './Edit-Eating-Record/Edit-Eating-Record';
import { EatingRecord } from 'models/diary';
import { Cat } from 'models/cat';

export type EatingRecordParams = {
  AddEatingRecord: {
    date?: string;
    catId?: number;
    remainCalroies?: number;
    newCustomFoodId?: number;
  };
  EditEatingRecord: {
    cat: Cat;
    record: EatingRecord;
    remainCalories: number;
  };
};

const Stack = createStackNavigator<EatingRecordParams>();

export const EatingRecordStack = () => {
  const cats = useRootSelector(selectCats);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddEatingRecord"
        component={AddEatingRecord}
        options={({ route }) => ({
          header: () => <HeaderBar>餵 {cats.find(cat => cat.id === route.params.catId)!.name} 吃飯</HeaderBar>,
        })}
      />
      <Stack.Screen
        name="EditEatingRecord"
        component={EditEatingRecordPage}
        options={() => ({ header: () => <HeaderBar>編輯餵食紀錄</HeaderBar> })}
      />
    </Stack.Navigator>
  );
};
