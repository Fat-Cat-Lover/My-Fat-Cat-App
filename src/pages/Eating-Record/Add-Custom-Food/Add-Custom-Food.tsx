import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonList } from 'components/Button-List/Button-List';
import { MfcButton } from 'components/Button/Button';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { addCustomFood } from 'services/cat-food';
import { AddCustomFoodStyle } from './Add-Custom-Food.style';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import { useRootDispatch } from 'redux/hooks';
import { showAlert } from 'redux/alert/slice';

type AddCustomFoodForm = {
  foodType: string;
  brand: string;
  foodName: string;
  calories: string;
  crudeProtein: string;
  crudeFat: string;
  carbohydrate: string;
  moisture: string;
};

type AddCustomFoodProps = StackScreenProps<RootNavParams, 'AddCustomFood'>;

export const AddCustomFood: React.FC<AddCustomFoodProps> = props => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<AddCustomFoodForm>({ mode: 'onChange' });
  const dispatch = useRootDispatch();

  async function onSubmit(data: AddCustomFoodForm) {
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
      await addCustomFood(newData);
      props.navigation.navigate('EatingRecord', {
        screen: 'AddEatingRecord',
        params: {
          newCustomFood: newData,
        },
      });
    } catch (err) {
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
        <View style={AddCustomFoodStyle.foodTypeBlock}>
          <Controller
            name="foodType"
            control={control}
            render={({ field }) => (
              <SelectInput
                label="種類"
                options={[
                  { label: '生食', value: '生食' },
                  { label: '主食罐', value: '主食罐' },
                  { label: '副食罐', value: '副食罐' },
                  { label: '乾飼料', value: '乾飼料' },
                  { label: '其他', value: '其他' },
                ]}
                onChange={value => {
                  if (value && field.value !== value) {
                    field.onChange(value);
                  }
                }}
                style={AddCustomFoodStyle.input}
                placeholder="選擇種類"
                icon="expandMore"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="品牌"
                value={field.value}
                onChange={field.onChange}
                placeholder="點此輸入"
                containerStyle={AddCustomFoodStyle.input}
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="foodName"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="食物內容"
                value={field.value}
                onChange={field.onChange}
                placeholder="點此輸入"
                containerStyle={AddCustomFoodStyle.input}
              />
            )}
            rules={{ required: true }}
          />
        </View>
        <View>
          <MfcHeaderText style={AddCustomFoodStyle.input}>營養素（每 100g）</MfcHeaderText>
          <Controller
            name="calories"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="熱量"
                value={field.value}
                onChange={field.onChange}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
              />
            )}
            rules={{ required: true, pattern: { message: '需為數字', value: /^\d+(\.\d+)?$/ } }}
          />
          <Controller
            name="crudeProtein"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="蛋白質"
                value={field.value}
                onChange={field.onChange}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
              />
            )}
            rules={{ required: true, pattern: { message: '需為數字', value: /^\d+(\.\d+)?$/ } }}
          />
          <Controller
            name="carbohydrate"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="碳水化合物"
                value={field.value}
                onChange={field.onChange}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
              />
            )}
            rules={{ required: true, pattern: { message: '需為數字', value: /^\d+(\.\d+)?$/ } }}
          />
          <Controller
            name="crudeFat"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="脂肪"
                value={field.value}
                onChange={field.onChange}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
              />
            )}
            rules={{ required: true, pattern: { message: '需為數字', value: /^\d+(\.\d+)?$/ } }}
          />
          <Controller
            name="moisture"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="水份"
                value={field.value}
                onChange={field.onChange}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
              />
            )}
            rules={{ required: true, pattern: { message: '需為數字', value: /^\d+(\.\d+)?$/ } }}
          />
        </View>
      </ScrollView>
      <ButtonList style={AddCustomFoodStyle.buttonBlock}>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton color="primary" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
          新增資訊
        </MfcButton>
      </ButtonList>
    </View>
  );
};
