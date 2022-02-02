import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
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
import { yupResolver } from '@hookform/resolvers/yup';

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

const schema = yup.object().shape({
  brand: yup.string().required('必填'),
  foodName: yup.string().required('必填'),
  calories: yup
    .string()
    .matches(/^\d+(\.\d+)?$/, { message: '需為數字', excludeEmptyString: true })
    .required('必填'),
  crudeProtein: yup
    .string()
    .matches(/^\d+(\.\d+)?$/, { message: '需為數字', excludeEmptyString: true })
    .required('必填'),
  crudeFat: yup
    .string()
    .matches(/^\d+(\.\d+)?$/, { message: '需為數字', excludeEmptyString: true })
    .required('必填'),
  carbohydrate: yup
    .string()
    .matches(/^\d+(\.\d+)?$/, { message: '需為數字', excludeEmptyString: true })
    .required('必填'),
  moisture: yup
    .string()
    .matches(/^\d+(\.\d+)?$/, { message: '需為數字', excludeEmptyString: true })
    .required('必填'),
});

export const AddCustomFood: React.FC<AddCustomFoodProps> = props => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<AddCustomFoodForm>({ mode: 'onTouched', resolver: yupResolver(schema) });
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
          />
          <Controller
            name="brand"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="品牌"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="點此輸入"
                containerStyle={AddCustomFoodStyle.input}
                errorMessage={fieldState.error && fieldState.error.message}
              />
            )}
          />
          <Controller
            name="foodName"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="食物內容"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="點此輸入"
                containerStyle={AddCustomFoodStyle.input}
                errorMessage={fieldState.error && fieldState.error.message}
              />
            )}
          />
        </View>
        <View>
          <MfcHeaderText style={AddCustomFoodStyle.input}>營養素（每 100g）</MfcHeaderText>
          <Controller
            name="calories"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="熱量"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
                errorMessage={fieldState.error && fieldState.error.message}
              />
            )}
          />
          <Controller
            name="crudeProtein"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="蛋白質"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
                errorMessage={fieldState.error && fieldState.error.message}
              />
            )}
          />
          <Controller
            name="carbohydrate"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="碳水化合物"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
                errorMessage={fieldState.error && fieldState.error.message}
              />
            )}
          />
          <Controller
            name="crudeFat"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="脂肪"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
                errorMessage={fieldState.error && fieldState.error.message}
              />
            )}
          />
          <Controller
            name="moisture"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="水份"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="點此輸入"
                keyboardType="number-pad"
                containerStyle={AddCustomFoodStyle.input}
                errorMessage={fieldState.error && fieldState.error.message}
              />
            )}
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
