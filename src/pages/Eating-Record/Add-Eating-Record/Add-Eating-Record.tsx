import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ImageSourcePropType, ScrollView, View } from 'react-native';
import { AddEatingRecordProps } from './Add-Eating-Record.interface';
import { DateInput } from 'components/Date-Input/Date-Input';
import { TimeInput } from 'components/Time-Input/Time-Input';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { Brand, FoodType, CatFood } from 'models/cat-food';
import { getFoodTypes, getBrands as _getBrands, getCatFoods as _getCatFoods } from 'services/cat-food';
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
import { getDiary } from 'services/diary';
import { plainToClass } from 'class-transformer';
import { Diary } from 'models/diary';

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
    setValue,
    formState: { isValid },
    handleSubmit,
  } = useForm<AddEatingRecordForm>({ mode: 'onChange' });
  const currentDate = new Date(props.route.params.date);
  currentDate.setHours(new Date().getHours());
  currentDate.setMinutes(new Date().getMinutes());
  const [dateTime, setDateTime] = useState<Date>(currentDate);
  const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [catFoods, setCatFoods] = useState<CatFood[]>([]);
  const [remainCalories, setRemainCalories] = useState<string>(props.route.params.remainCalroies.toFixed(2));
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
    if (catFood.length < 1) {
      //TODO: Change to custom alert
      Alert.alert('此品牌目前沒有該類別的食物喔');
    }
    setCatFoods(catFood);
  }

  function calcWeight(calories: number): number {
    if (calories) {
      const catFoodId = getValues('catFood');
      if (catFoodId) {
        const catFood = catFoods.find(_catFood => _catFood.id === catFoodId);
        return parseFloat(((calories / catFood!.calories) * 100).toFixed(1));
      }
    }
    return 0;
  }

  async function onSubmit(data: AddEatingRecordForm) {
    const foodType = foodTypes.find(type => type.id === data.foodType)!;
    const brand = brands.find(_brand => _brand.id === data.brand)!;
    const food = catFoods.find(_food => _food.id === data.catFood)!;
    await dispatch(
      addEatingRecord({
        catId: cat.id,
        foodType: foodType.type,
        brand: brand.name,
        food,
        weight: calcWeight(data.calory),
        time: dateTime,
      })
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
          onChange={async date => {
            setDateTime(
              new Date(date.getFullYear(), date.getMonth(), date.getDate(), dateTime.getHours(), dateTime.getMinutes())
            );
            const diary = plainToClass(Diary, await getDiary(cat.id, date));
            setRemainCalories((cat.dailyCalories - diary.caloriesEatenToday).toFixed(2));
          }}
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
                if (value && field.value !== value) {
                  field.onChange(value);
                  getBrands(value as number);
                  if (getValues('brand')) {
                    setValue('brand', null);
                    setValue('catFood', null);
                    setValue('calory', 0);
                  }
                }
              }}
              value={field.value}
              placeholder="選擇種類"
              style={AddEatingRecordStyle.formField}
              icon="expandMore"
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
                if (value && field.value !== value) {
                  field.onChange(value);
                  getCatFoods(value as number);
                  if (getValues('catFood')) {
                    setValue('catFood', null);
                    setValue('calory', 0);
                  }
                }
              }}
              icon="expandMore"
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
                if (value && field.value !== value) {
                  setValue('calory', 0);
                  field.onChange(value);
                }
              }}
              value={field.value}
              placeholder="選擇食物"
              style={AddEatingRecordStyle.formField}
              icon="expandMore"
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
                onChange={value => field.onChange(parseInt(value, 10))}
                containerStyle={AddEatingRecordStyle.caloryInput}
                disabled={!watch('catFood')}
              />
            )}
            rules={{ required: true, validate: { positive: v => parseInt(v, 10) > 0 || '此欄需大於0' } }}
          />
          <View style={AddEatingRecordStyle.weight}>
            <MfcText size="large" type="medium">
              = {calcWeight(watch('calory', 0))} g
            </MfcText>
          </View>
        </View>
        <MfcText style={[AddEatingRecordStyle.formField, CommonStyle.grayText]}>
          今日尚未進食: {remainCalories} cal
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
