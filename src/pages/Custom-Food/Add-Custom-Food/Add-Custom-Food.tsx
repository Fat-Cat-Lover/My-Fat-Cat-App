import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonList } from 'components/Button-List/Button-List';
import { MfcButton } from 'components/Button/Button';
import { addCustomFood } from 'services/cat-food';
import { AddCustomFoodStyle } from './Add-Custom-Food.style';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import { useRootDispatch } from 'redux/hooks';
import { showAlert } from 'redux/alert/slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompositeScreenProps } from '@react-navigation/native';
import { CustomFoodParams } from '../navigation.params';
import { CustomFoodForm, customFoodFormSchema } from '../components/Custom-Food-Form';

type AddCustomFoodProps = CompositeScreenProps<
  StackScreenProps<CustomFoodParams, 'addCustomFood'>,
  StackScreenProps<RootNavParams>
>;

export const AddCustomFood: React.FC<AddCustomFoodProps> = props => {
  const formMethods = useForm<CustomFoodForm>({ mode: 'onTouched', resolver: yupResolver(customFoodFormSchema) });
  const dispatch = useRootDispatch();

  async function onSubmit(data: CustomFoodForm) {
    const newData = {
      foodType: data.foodType,
      brand: data.brand,
      foodName: data.foodName,
      calories: parseFloat(data.calories),
      crudeProtein: parseFloat(data.crudeProtein),
      crudeFat: parseFloat(data.crudeFat),
      carbohydrate: parseFloat(data.carbohydrate),
      moisture: parseFloat(data.moisture),
    };

    try {
      const newFoodId = await addCustomFood(newData);
      props.navigation.navigate({
        name: 'AddEatingRecord',
        params: {
          newCustomFoodId: newFoodId,
        },
        merge: true,
      });
    } catch (err: any) {
      if (err.code === 0) {
        dispatch(
          showAlert({
            message: '無法新增一模一樣的食物喔。',
            buttons: [
              {
                text: '好的',
              },
            ],
          })
        );
      }
    }
  }

  return (
    <View style={AddCustomFoodStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <FormProvider {...formMethods}>
          <CustomFoodForm />
        </FormProvider>
      </ScrollView>
      <ButtonList style={AddCustomFoodStyle.buttonBlock}>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton
          color="primary"
          onPress={formMethods.handleSubmit(onSubmit)}
          disabled={!formMethods.formState.isValid}>
          新增資訊
        </MfcButton>
      </ButtonList>
    </View>
  );
};
