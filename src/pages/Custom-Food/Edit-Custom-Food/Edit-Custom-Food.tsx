import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ButtonList } from 'components/Button-List/Button-List';
import { MfcButton } from 'components/Button/Button';
import { RootNavParams } from 'navigations';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { useRootDispatch } from 'redux/hooks';
import { requestEnd, requestStart } from 'redux/loading/slice';
import { deleteCustomFood, editCustomFood } from 'services/cat-food';
import { CommonStyle } from 'styles/common-style';
import { CustomFoodForm } from '../components/Custom-Food-Form';
import { CustomFoodParams } from '../navigation.params';
import { EditCustomFoodStyle } from './Edit-Custom-Food.style';

type EditCustomFoodProps = CompositeScreenProps<
  StackScreenProps<CustomFoodParams, 'editCustomFood'>,
  StackScreenProps<RootNavParams>
>;

export const EditCustomFood: React.FC<EditCustomFoodProps> = props => {
  const formMethods = useForm<CustomFoodForm>();
  const dispatch = useRootDispatch();

  async function onSubmit(data: CustomFoodForm) {
    try {
      dispatch(requestStart({}));
      const food = props.route.params;

      await editCustomFood({
        id: food.id,
        foodType: data.foodType,
        brand: data.brand,
        foodName: data.foodName,
        calories: parseFloat(data.calories),
        crudeProtein: parseFloat(data.crudeProtein),
        crudeFat: parseFloat(data.crudeFat),
        carbohydrate: parseFloat(data.carbohydrate),
        moisture: parseFloat(data.moisture),
      });

      props.navigation.navigate('TabBar', {
        screen: 'SettingStack',
        params: { screen: 'customFoodList', params: { edit: true } },
      });
    } catch (err) {
    } finally {
      dispatch(requestEnd({}));
    }
  }

  async function deleteFood() {
    try {
      dispatch(requestStart({}));
      await deleteCustomFood(props.route.params.id);
      props.navigation.navigate('TabBar', {
        screen: 'SettingStack',
        params: { screen: 'customFoodList', params: { edit: true } },
      });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(requestEnd({}));
    }
  }

  return (
    <View style={EditCustomFoodStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <FormProvider {...formMethods}>
          <CustomFoodForm food={props.route.params} />
        </FormProvider>
        <MfcButton iconName="cancel" color="gray" textStyle={CommonStyle.grayText} onPress={deleteFood}>
          刪除此筆自定義食物資訊
        </MfcButton>
      </ScrollView>
      <ButtonList style={EditCustomFoodStyle.buttonBlock}>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton
          color="primary"
          onPress={formMethods.handleSubmit(onSubmit)}
          disabled={!formMethods.formState.isValid}>
          確定修改
        </MfcButton>
      </ButtonList>
    </View>
  );
};
