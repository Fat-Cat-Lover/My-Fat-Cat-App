import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ButtonList } from 'components/Button-List/Button-List';
import { MfcButton } from 'components/Button/Button';
import { RootNavParams } from 'navigations';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { dismissAlert, showAlert } from 'redux/alert/slice';
import { useRootDispatch } from 'redux/hooks';
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

  function onSubmit(data: CustomFoodForm) {
    try {
      dispatch(showAlert);

    } catch (err) {
    } finally {
      dispatch(dismissAlert);
    }
  }

  return (
    <View style={EditCustomFoodStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <FormProvider {...formMethods}>
          <CustomFoodForm food={props.route.params} />
        </FormProvider>
        <MfcButton iconName="cancel" color="gray" textStyle={CommonStyle.grayText} onPress={deleteEatingRecord}>
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
          新增資訊
        </MfcButton>
      </ButtonList>
    </View>
  );
};
