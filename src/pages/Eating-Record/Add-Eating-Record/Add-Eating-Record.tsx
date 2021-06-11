import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { AddEatingRecordProps } from './Add-Eating-Record.interface';
import { DateInput } from 'components/Date-Input/Date-Input';
import { TimeInput } from 'components/Time-Input/Time-Input';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { Brand, FoodType, CatFood } from 'models/cat-food';
import { getCategories, getBrands as _getBrands, getCatFoods as _getCatFoods } from 'services/eating-record';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { AddEatingRecordStyle } from './Add-Eating-Record.style';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { DefaultCatsImages } from 'common/default-cat-images';
import { MfcButton } from 'components/Button/Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcText } from 'components/Text/Text';
import { CommonStyle } from 'styles/common-style';
import { ButtonList } from 'components/Button-List/Button-List';
import { useRootSelector } from 'redux/hooks';
import { selectCats } from 'redux/cats/selector';

interface AddEatingRecordForm {
  date: Date;
  time: Date;
  categories: number;
  brands: number;
  catFoods: number;
  calory: number;
}

export const AddEatingRecord: React.FC<AddEatingRecordProps> = props => {
  const { control, getValues } = useForm<AddEatingRecordForm>();
  const cats = useRootSelector(selectCats);
  const cat = cats.find(_cat => _cat.id === props.route.params.catId)!;
  const [categories, setCategories] = useState<FoodType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [catFoods, setCatFoods] = useState<CatFood[]>([]);
  const [catFoodWeight, setCatFoodWeight] = useState<string>('0');

  useEffect(() => {
    getCategories().then(_categories => setCategories(_categories));
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
    const foodTypeId = getValues('categories');
    const catFood = await _getCatFoods(foodTypeId, brandId);
    setCatFoods(catFood);
  }

  function calcWeight(calories: number) {
    const catFoodId = getValues('catFoods');
    const catFood = catFoods.find(_catFood => _catFood.id === catFoodId);
    return (calories / catFood!.calories).toFixed(1);
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
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DateInput
              label="日期"
              value={field.value}
              onChange={field.onChange}
              style={AddEatingRecordStyle.formField}
            />
          )}
          defaultValue={new Date(props.route.params.date)}
        />
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <TimeInput
              label="時間"
              value={field.value}
              onChange={field.onChange}
              style={AddEatingRecordStyle.formField}
            />
          )}
          defaultValue={new Date(props.route.params.date)}
        />
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="種類"
              options={categories.map(category => ({ label: category.type, value: category.id }))}
              onChange={value => {
                getBrands(value as number);
                field.onChange(value);
              }}
              placeholder="選擇種類"
              style={AddEatingRecordStyle.formField}
            />
          )}
        />
        <Controller
          name="brands"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="品牌"
              options={brands.map(brand => ({ label: brand.name, value: brand.id }))}
              onChange={value => {
                getCatFoods(value as number);
                field.onChange(value);
              }}
              placeholder="選擇品牌"
              style={AddEatingRecordStyle.formField}
            />
          )}
        />
        <Controller
          name="catFoods"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="食物內容"
              options={catFoods.map(catFood => ({ label: catFood.name, value: catFood.id }))}
              onChange={field.onChange}
              placeholder="選擇食物"
              style={AddEatingRecordStyle.formField}
            />
          )}
        />
        <View style={AddEatingRecordStyle.caloryContainer}>
          <Controller
            name="calory"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="卡路里"
                keyboardType="number-pad"
                value={field.value.toString()}
                onChange={value => {
                  const calories = parseInt(value, 10);
                  const weight = calcWeight(calories);
                  setCatFoodWeight(weight);
                  field.onChange(calories);
                }}
                containerStyle={AddEatingRecordStyle.caloryInput}
              />
            )}
            defaultValue={0}
          />
          <View style={AddEatingRecordStyle.weight}>
            <MfcText size="large" type="medium">
              = {catFoodWeight} g
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
        <MfcButton color="primary">確定餵食</MfcButton>
      </ButtonList>
    </View>
  );
};
