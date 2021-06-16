import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { AddEatingRecordProps } from './Add-Eating-Record.interface';
import { DateInput } from 'components/Date-Input/Date-Input';
import { TimeInput } from 'components/Time-Input/Time-Input';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { Brand, FoodType, CatFood } from 'models/cat-food';
import { getFoodTypes, getBrands as _getBrands, getCatFoods as _getCatFoods } from 'services/eating-record';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { AddEatingRecordStyle } from './Add-Eating-Record.style';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { DefaultCatsImages } from 'common/default-cat-images';
import { MfcButton } from 'components/Button/Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcText } from 'components/Text/Text';
import { CommonStyle } from 'styles/common-style';
import { ButtonList } from 'components/Button-List/Button-List';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { selectCats } from 'redux/cats/selector';
import { addEatingRecord } from 'redux/diary/slice';

interface AddEatingRecordForm {
  foodType: number;
  brand: number | null;
  catFood: number | null;
  calory: number;
}

export const AddEatingRecord: React.FC<AddEatingRecordProps> = props => {
  const cats = useRootSelector(selectCats);
  const cat = cats.find(_cat => _cat.id === props.route.params.catId)!;
  const {
    control,
    getValues,
    watch,
    reset,
    formState: { isValid },
    handleSubmit,
  } = useForm<AddEatingRecordForm>();
  const [dateTime, setDateTime] = useState<Date>(new Date(props.route.params.date));
  const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [catFoods, setCatFoods] = useState<CatFood[]>([]);
  const [catFoodWeight, setCatFoodWeight] = useState<string>('0.0');
  const dispatch = useRootDispatch();

  useEffect(() => {
    getFoodTypes().then(types => setFoodTypes(types));
  }, []);

  let catImage: ImageSourcePropType;
  if (cat.image) {
    catImage = { uri: cat.image };
  } else {
    catImage = DefaultCatsImages[cat.useDefault!];
  }

  async function getBrands(foodTypeId: number) {
    const _brands = await _getBrands(foodTypeId);
    setBrands(_brands);
  }

  async function getCatFoods(brandId: number) {
    const foodTypeId = getValues('foodType');
    const catFood = await _getCatFoods(foodTypeId, brandId);
    setCatFoods(catFood);
  }

  function calcWeight(calories: number) {
    const catFoodId = getValues('catFood');
    if (catFoodId) {
      const catFood = catFoods.find(_catFood => _catFood.id === catFoodId);
      return (calories / catFood!.calories).toFixed(1);
    } else {
      return '0.0';
    }
  }

  async function onSubmit(data: AddEatingRecordForm) {
    await dispatch(
      addEatingRecord({ catId: cat.id, foodId: data.catFood!, weight: parseFloat(catFoodWeight), time: dateTime })
    );
    props.navigation.goBack();
  }

  return (
    <View style={AddEatingRecordStyle.container}>
      <ScrollView>
        <View style={AddEatingRecordStyle.topBlock}>
          <CatPhotoButton size={55} image={catImage} style={AddEatingRecordStyle.catImage} />
          <MfcButton color="gray" style={AddEatingRecordStyle.addCatFoodButton}>
            <View style={AddEatingRecordStyle.addCatFoodButtonContent}>
              <MfcIcon name="add" />
              <MfcText type="medium" size="large" style={CommonStyle.grayText}>
                新增自定義食物資訊
              </MfcText>
            </View>
          </MfcButton>
        </View>
        <DateInput
          label="日期"
          value={dateTime}
          onChange={date =>
            setDateTime(
              new Date(date.getFullYear(), date.getMonth(), date.getDate(), dateTime.getHours(), dateTime.getMinutes())
            )
          }
          style={AddEatingRecordStyle.formField}
        />
        <TimeInput
          label="時間"
          value={dateTime}
          onChange={time =>
            setDateTime(
              new Date(
                dateTime.getUTCFullYear(),
                dateTime.getMonth(),
                dateTime.getDate(),
                time.getHours(),
                time.getMinutes()
              )
            )
          }
          style={AddEatingRecordStyle.formField}
        />
        <Controller
          name="foodType"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="種類"
              options={foodTypes.map(type => ({ label: type.type, value: type.id }))}
              onChange={value => {
                getBrands(value as number);
                if (getValues('brand')) {
                  reset({
                    brand: null,
                    catFood: null,
                    calory: 0,
                  });
                }
                setCatFoodWeight('0.0');
                field.onChange(value);
              }}
              value={field.value}
              placeholder="選擇種類"
              style={AddEatingRecordStyle.formField}
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="品牌"
              options={brands.map(brand => ({ label: brand.name, value: brand.id }))}
              onChange={value => {
                getCatFoods(value as number);
                if (getValues('catFood')) {
                  reset({
                    catFood: null,
                    calory: 0,
                  });
                }
                field.onChange(value);
              }}
              value={field.value}
              placeholder="選擇品牌"
              style={AddEatingRecordStyle.formField}
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          name="catFood"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="食物內容"
              options={catFoods.map(catFood => ({ label: catFood.name, value: catFood.id }))}
              onChange={value => {
                reset({
                  calory: 0,
                });
                field.onChange(value);
              }}
              value={field.value}
              placeholder="選擇食物"
              style={AddEatingRecordStyle.formField}
            />
          )}
          rules={{ required: true }}
        />
        <View style={AddEatingRecordStyle.caloryContainer}>
          <Controller
            name="calory"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="卡路里"
                keyboardType="number-pad"
                value={field.value ? field.value.toString() : ''}
                onChange={value => {
                  const calories = value ? parseInt(value, 10) : 0;
                  field.onChange(calories);
                }}
                containerStyle={AddEatingRecordStyle.caloryInput}
                disabled={!watch('catFood')}
              />
            )}
            rules={{ required: true }}
            defaultValue=""
          />
          <View style={AddEatingRecordStyle.weight}>
            <MfcText size="large" type="medium">
              = {calcWeight(watch('calory', 0))} g
            </MfcText>
          </View>
        </View>
        <MfcText style={[AddEatingRecordStyle.formField, CommonStyle.grayText]}>
          今日尚未進食: {props.route.params.remainCalroies} cal
        </MfcText>
      </ScrollView>
      <ButtonList>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton color="primary" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
          確定餵食
        </MfcButton>
      </ButtonList>
    </View>
  );
};
