import React from 'react';
import * as yup from 'yup';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import spacings from 'styles/spacings';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { CustomFood } from 'models/cat-food';

export interface CustomFoodFormProps {
  food?: CustomFood & { brandName: string };
}

export type CustomFoodForm = {
  foodType: string;
  brand: string;
  foodName: string;
  calories: string;
  crudeProtein: string;
  crudeFat: string;
  carbohydrate: string;
  moisture: string;
};

export const customFoodFormSchema = yup.object().shape({
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

export const CustomFoodForm: React.FC<CustomFoodFormProps> = props => {
  const { control } = useFormContext<CustomFoodForm>();
  return (
    <>
      <View style={style.foodTypeBlock}>
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
              value={field.value}
              style={style.input}
              placeholder="選擇種類"
              icon="expandMore"
            />
          )}
          defaultValue={props.food ? props.food.foodType : undefined}
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
              containerStyle={style.input}
              errorMessage={fieldState.error && fieldState.error.message}
            />
          )}
          defaultValue={props.food ? props.food.brandName : ''}
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
              containerStyle={style.input}
              errorMessage={fieldState.error && fieldState.error.message}
            />
          )}
          defaultValue={props.food ? props.food.name : ''}
        />
      </View>
      <View>
        <MfcHeaderText style={style.input}>營養素（每 100g）</MfcHeaderText>
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
              containerStyle={style.input}
              errorMessage={fieldState.error && fieldState.error.message}
            />
          )}
          defaultValue={props.food ? props.food.calories.toString() : ''}
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
              containerStyle={style.input}
              errorMessage={fieldState.error && fieldState.error.message}
            />
          )}
          defaultValue={props.food ? props.food.crudeProtein.toString() : ''}
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
              containerStyle={style.input}
              errorMessage={fieldState.error && fieldState.error.message}
            />
          )}
          defaultValue={props.food ? props.food.carbohydrate.toString() : ''}
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
              containerStyle={style.input}
              errorMessage={fieldState.error && fieldState.error.message}
            />
          )}
          defaultValue={props.food ? props.food.crudeFat.toString() : ''}
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
              containerStyle={style.input}
              errorMessage={fieldState.error && fieldState.error.message}
            />
          )}
          defaultValue={props.food ? props.food.moisture.toString() : ''}
        />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  foodTypeBlock: {
    marginBottom: spacings.spacing7,
  },
  input: {
    marginBottom: spacings.spacing5,
  },
});
