import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { AddEatingRecordProps } from './Add-Eating-Record.interface';
import { DateInput } from 'components/Date-Input/Date-Input';
import { TimeInput } from 'components/Time-Input/Time-Input';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { Brand, Cateory, CatFood } from 'models/cat-food';
import { getCategories, getBrands as _getBrands, getCatFoods as _getCatFoods } from 'services/eating-record';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';

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

  const [categories, setCategories] = useState<Cateory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [catFoods, setCatFoods] = useState<CatFood[]>([]);

  useEffect(() => {
    getCategories().then(_categories => setCategories(_categories));
  }, []);

  async function getBrands(categoryId: number) {
    const _brands = await _getBrands(categoryId);
    setBrands(_brands);
  }

  async function getCatFoods(brandId: number) {
    const categoryId = getValues('categories');
    const catFood = await _getCatFoods(categoryId, brandId);
    setCatFoods(catFood);
  }

  return (
    <View>
      <ScrollView>
        <Controller
          name="date"
          control={control}
          render={({ field }) => <DateInput label="日期" value={field.value} onChange={field.onChange} />}
          defaultValue={props.route.params.date}
        />
        <Controller
          name="time"
          control={control}
          render={({ field }) => <TimeInput label="時間" value={field.value} onChange={field.onChange} />}
          defaultValue={props.route.params.date}
        />
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="種類"
              options={categories.map(category => ({ label: category.cateory, value: category.id }))}
              onChange={value => {
                getBrands(value as number);
                field.onChange(value);
              }}
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
            />
          )}
        />
        <Controller 
          name="catFoods"
          render={({ field }) => (
            <SelectInput
              label="食物內容"
              options={catFoods.map(catFood => ({ label: catFood.name, value: catFood.id }))}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="calory"
          render={({ field }) => (
            <MfcTextInput label="卡路里" keyboardType="number-pad" value={field.value} onChange={field.onChange} />
          )}
        />
      </ScrollView>
    </View>
  );
};
