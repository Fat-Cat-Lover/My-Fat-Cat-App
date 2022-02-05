import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { EditCustomFoodStyle } from './Edit-Custom-Food.style';


export const EditCustomFood = props => {

  const formMethods = useForm<Custom>();

  return (
    <View style={EditCustomFoodStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <FormProvider>

        </FormProvider>
      </ScrollView>
    </View>
  )
}