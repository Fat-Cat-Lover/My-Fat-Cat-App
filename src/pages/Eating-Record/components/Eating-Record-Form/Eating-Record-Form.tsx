import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { plainToClass } from 'class-transformer';
import dayjs, { Dayjs } from 'dayjs';
import * as yup from 'yup';
import { DateInput } from 'components/Date-Input/Date-Input';
import { Controller, useFormContext } from 'react-hook-form';
import { TimeInput } from 'components/Time-Input/Time-Input';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { InputLabel } from 'components/Input-Label/Input-Label';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { MfcText } from 'components/Text/Text';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { EatingRecordFormStyle } from './Eating-Record-Form.style';
import { Brand, CatFood, FoodType } from 'models/cat-food';
import { CommonStyle } from 'styles/common-style';
import {
  getFoodTypes,
  getBrands as getBrandsFromApi,
  getCatFoods as getCatFoodsFromApi,
  getCustomBrands,
  getCustomFoods,
} from 'services/cat-food';
import { useRootDispatch } from 'redux/hooks';
import { requestEnd, requestStart } from 'redux/loading/slice';
import { Diary } from 'models/diary';
import { showAlert } from 'redux/alert/slice';
import { getDiary } from 'services/diary';
import { EatingRecordFormProps } from './Eating-Record-Form.interface';

export interface IEatingRecordForm {
  datetime: Dayjs;
  foodType: FoodType;
  brand: (Brand & { customFood?: boolean }) | null;
  catFood: CatFood | null;
  measurements: {
    calories: number;
    weight: number;
  };
}

export const eatingRecordFormSchema = yup.object({
  datetime: yup.object().required('必填'),
  foodType: yup.object().required('必填'),
  brand: yup.object().required('必填'),
  catFood: yup.object().required('必填'),
  measurements: yup.object({
    calories: yup.number().required('必填').moreThan(0, '需大於0'),
    weight: yup.number().required('必填').moreThan(0, '需大於0'),
  }),
});

function caloriesWeightTransfer(value: number, foodCalories: number, to: 'calories' | 'weight') {
  if (to === 'calories') {
    return parseFloat((value * (foodCalories / 100)).toFixed(1));
  } else {
    return parseFloat(((value / foodCalories) * 100).toFixed(1));
  }
}

export const EatingRecordForm: React.FC<EatingRecordFormProps> = props => {
  const [remainCalories, setRemainCalories] = useState<number>(props.remainCalories);
  const [calcType, setCalcType] = useState<'calories' | 'weight'>('calories');
  const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
  const [brands, setBrands] = useState<(Brand & { customFood?: boolean })[]>([]);
  const [catFoods, setCatFoods] = useState<CatFood[]>([]);
  const { control, getValues, watch, setValue, trigger } = useFormContext<IEatingRecordForm>();
  const dispatch = useRootDispatch();

  const onFoodSet = useCallback(async () => {
    dispatch(requestStart({}));
    try {
      if (props.food && foodTypes.length > 0) {
        const foodType = foodTypes.find(t => t.food_type === props.food!.food_type.food_type)!;
        const _brands = await getBrands(foodType);
        const _foods = await getCatFoods(foodType, props.food.brand.id, !!props.customFood);
        const _brand = _brands
          .filter(b => !!b.customFood === !!props.customFood)
          .find(b => b.id === props.food?.brand.id)!;
        const _food = _foods.find(f => f.id === props.food!.id)!;
        setValue('foodType', foodType);
        setValue('brand', _brand);
        setValue('catFood', _food);
        if (props.weight) {
          setValue('measurements', {
            weight: props.weight,
            calories: caloriesWeightTransfer(props.weight, _food.calories, 'calories'),
          });
        } else {
          setValue('measurements', {
            weight: 0,
            calories: 0,
          });
        }
        trigger();
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(requestEnd({}));
    }
  }, [dispatch, props.food, foodTypes]);

  useEffect(() => {
    onFoodSet();
  }, [onFoodSet]);

  useEffect(() => {
    dispatch(requestStart({}));
    getFoodTypes().then(types => {
      setFoodTypes(types);
      dispatch(requestEnd({}));
    });
  }, [dispatch]);

  async function getBrands(foodType: FoodType): Promise<(Brand & { customFood?: boolean })[]> {
    const [_brands, customBrands] = await Promise.all([
      getBrandsFromApi(foodType.id),
      getCustomBrands(foodType.food_type),
    ]);
    _brands.push(...customBrands.map(b => ({ id: b.id, name: `${b.name} [自訂]`, customFood: true })));
    setBrands(_brands);
    return _brands;
  }

  async function getCatFoods(foodType: FoodType, brandId: number, customFood: boolean) {
    let _catFoods: CatFood[];
    if (customFood) {
      _catFoods = await getCustomFoods(foodType.food_type, brandId);
    } else {
      _catFoods = await getCatFoodsFromApi(foodType.id, brandId);
    }
    if (_catFoods.length < 1) {
      dispatch(
        showAlert({
          message: '此品牌目前沒有該類別的食物喔',
          buttons: [{ text: '好的' }],
        })
      );
    }
    setCatFoods(_catFoods);
    return _catFoods;
  }

  return (
    <>
      <Controller
        name="datetime"
        control={control}
        render={({ field }) => (
          <DateInput
            label="日期"
            value={field.value.toDate()}
            onChange={async date => {
              field.onChange(field.value.year(date.getFullYear()).month(date.getMonth()).date(date.getDate()));
              const diary = plainToClass(Diary, await getDiary(props.cat.id, date.toDateString()));
              setRemainCalories(props.cat.dailyCalories - diary.caloriesEatenToday);
            }}
            style={EatingRecordFormStyle.formField}
          />
        )}
        defaultValue={dayjs(props.date)}
      />
      <Controller
        name="datetime"
        control={control}
        render={({ field }) => (
          <TimeInput
            label="時間"
            value={field.value.toDate()}
            onChange={time => field.onChange(field.value.hour(time.getHours()).minute(time.getMinutes()))}
            style={EatingRecordFormStyle.formField}
          />
        )}
      />
      <Controller
        name="foodType"
        control={control}
        render={({ field }) => (
          <SelectInput
            label="種類"
            options={foodTypes.map(type => ({ label: type.food_type, value: type, key: type.id }))}
            onChange={value => {
              if (value && field.value?.id !== value.id) {
                field.onChange(value);
                getBrands(value);
                if (getValues('brand')) {
                  setValue('brand', null);
                  setValue('catFood', null);
                  setValue('measurements', {
                    weight: 0,
                    calories: 0,
                  });
                }
              }
            }}
            value={field.value}
            placeholder="選擇種類"
            style={EatingRecordFormStyle.formField}
            icon="expandMore"
          />
        )}
      />
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <SelectInput
            label="品牌"
            options={brands.map(brand => ({ label: brand.name, value: brand, key: brand.name }))}
            onChange={value => {
              if (value && field.value?.name !== value.name) {
                field.onChange(value);
                getCatFoods(getValues('foodType'), value.id, !!value.customFood);
                if (getValues('catFood')) {
                  setValue('catFood', null);
                  setValue('measurements', {
                    weight: 0,
                    calories: 0,
                  });
                }
              }
            }}
            icon="expandMore"
            value={field.value}
            placeholder="選擇品牌"
            style={EatingRecordFormStyle.formField}
          />
        )}
      />
      <Controller
        name="catFood"
        control={control}
        render={({ field }) => (
          <SelectInput
            label="食物內容"
            options={catFoods.map(catFood => ({ label: catFood.name, value: catFood, key: catFood.id }))}
            onChange={value => {
              if (value && field.value?.id !== value.id) {
                field.onChange(value);
                setValue('measurements', {
                  weight: 0,
                  calories: 0,
                });
              }
            }}
            value={field.value}
            placeholder="選擇食物"
            style={EatingRecordFormStyle.formField}
            icon="expandMore"
          />
        )}
      />
      <>
        <InputLabel label={calcType === 'calories' ? '卡路里' : '重量'} />
        <View style={EatingRecordFormStyle.calcBlock}>
          <View style={EatingRecordFormStyle.caloryContainer}>
            <Controller
              name="measurements"
              control={control}
              render={({ field }) => (
                <>
                  <MfcTextInput
                    keyboardType="number-pad"
                    value={
                      calcType === 'calories'
                        ? field.value.calories
                          ? field.value.calories.toString()
                          : ''
                        : field.value.weight
                        ? field.value.weight.toString()
                        : ''
                    }
                    onChange={value => {
                      const food = getValues('catFood');
                      if (value && food) {
                        if (calcType === 'calories') {
                          field.onChange({
                            calories: parseFloat(value),
                            weight: caloriesWeightTransfer(parseFloat(value), food.calories, 'weight'),
                          });
                        } else {
                          field.onChange({
                            calories: caloriesWeightTransfer(parseFloat(value), food.calories, 'calories'),
                            weight: parseFloat(value),
                          });
                        }
                      } else {
                        field.onChange({
                          calories: 0,
                          weight: 0,
                        });
                      }
                    }}
                    onBlur={field.onBlur}
                    containerStyle={EatingRecordFormStyle.caloryInput}
                    disabled={!watch('catFood')}
                  />
                  <View style={EatingRecordFormStyle.weight}>
                    <MfcText size="large" type="medium">
                      = {calcType === 'calories' ? field.value.weight : field.value.calories}
                      {calcType === 'calories' ? ' g' : ' cal'}
                    </MfcText>
                  </View>
                </>
              )}
              defaultValue={{
                calories: 0,
                weight: 0,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setCalcType(calcType === 'calories' ? 'weight' : 'calories')}
            style={EatingRecordFormStyle.exchangeButton}>
            <MfcIcon name="transfer" />
          </TouchableOpacity>
        </View>
        <MfcText style={[EatingRecordFormStyle.formField, CommonStyle.grayText]}>
          今日尚未進食: {remainCalories.toFixed(2)} cal
        </MfcText>
      </>
    </>
  );
};
