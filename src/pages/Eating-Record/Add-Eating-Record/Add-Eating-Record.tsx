import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { AddEatingRecordProps } from './Add-Eating-Record.interface';
import { DateInput } from 'components/Date-Input/Date-Input';
import { TimeInput } from 'components/Time-Input/Time-Input';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { FoodType, CatFood } from 'models/cat-food';
import {
  getFoodTypes,
  getBrands as getBrandsFromApi,
  getCatFoods as getCatFoodsFromApi,
  getCustomBrands,
  getCustomFoods,
} from 'services/cat-food';
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
import { requestEnd, requestStart } from 'redux/loading/slice';
import { Alert } from 'components/Alert/Alert';
import { InputLabel } from 'components/Input-Label/Input-Label';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AddEatingRecordForm {
  foodType: number;
  brand: string | null;
  catFood: number | null;
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
    trigger,
    handleSubmit,
  } = useForm<AddEatingRecordForm>({ mode: 'onChange' });
  const currentDate = new Date(props.route.params.date!);
  currentDate.setHours(new Date().getHours());
  currentDate.setMinutes(new Date().getMinutes());
  const [dateTime, setDateTime] = useState<Date>(currentDate);
  const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [catFoods, setCatFoods] = useState<CatFood[]>([]);
  const [remainCalories, setRemainCalories] = useState<string>(props.route.params.remainCalroies!.toFixed(2));
  const [calcType, setCalcType] = useState<'calroies' | 'weight'>('calroies');
  const [eatingCalories, setCalories] = useState<number>(0);
  const [eatingWeight, setWeight] = useState<number>(0);

  const [showAlert, toggleAlert] = useState<boolean>(false);
  const [alertMessage, changeAlertMessage] = useState<string>('');
  const dispatch = useRootDispatch();

  const handleCustomFood = useCallback(
    async (customFood: { foodType: string; brand: string; foodName: string }) => {
      const foodType = foodTypes.find(t => t.type === customFood.foodType)!;
      const [_brands, customBrands] = await Promise.all([
        getBrandsFromApi(foodType.id),
        getCustomBrands(foodType.type),
      ]);
      const brand = customBrands.find(b => b.name === customFood.brand)!;
      const customFoods = await getCustomFoods(foodType.type, brand.id);
      const _customFood = customFoods.find(f => f.name === customFood.foodName)!;
      resetCalcValue();
      setBrands([
        ..._brands.map(b => ({ id: b.id.toString(), name: b.name })),
        ...customBrands.map(b => ({ id: `自訂${b.id}`, name: `${b.name} [自訂]` })),
      ]);
      setCatFoods(customFoods);
      setValue('foodType', foodType.id);
      setValue('brand', `自訂${brand.id}`);
      setValue('catFood', _customFood.id);
      trigger();
    },
    [foodTypes]
  );

  useEffect(() => {
    dispatch(requestStart({}));
    getFoodTypes().then(types => {
      setFoodTypes(types);
      dispatch(requestEnd({}));
    });
  }, [dispatch]);

  useEffect(() => {
    if (props.route.params?.newCustomFood) {
      handleCustomFood(props.route.params.newCustomFood);
    }
  }, [handleCustomFood, props.route.params.newCustomFood]);

  let catImage: ImageSourcePropType;
  if (cat.image) {
    catImage = { uri: cat.image };
  } else {
    catImage = DefaultCatsImages[cat.useDefault!];
  }

  async function getBrands(foodTypeId: number) {
    const foodType = foodTypes.find(t => t.id === foodTypeId)!;
    const [_brands, customBrands] = await Promise.all([getBrandsFromApi(foodTypeId), getCustomBrands(foodType.type)]);
    setBrands([
      ..._brands.map(b => ({ id: b.id.toString(), name: b.name })),
      ...customBrands.map(b => ({ id: `自訂${b.id}`, name: `${b.name} [自訂]` })),
    ]);
  }

  async function getCatFoods(brandId: string) {
    const foodTypeId = getValues('foodType');
    let _catFoods: CatFood[];
    if (brandId.startsWith('自訂')) {
      const foodType = foodTypes.find(t => t.id === foodTypeId)!;
      _catFoods = await getCustomFoods(foodType.type, parseInt(brandId.substr(2), 10));
    } else {
      _catFoods = await getCatFoodsFromApi(foodTypeId, parseInt(brandId, 10));
    }
    if (_catFoods.length < 1) {
      changeAlertMessage('此品牌目前沒有該類別的食物喔');
      toggleAlert(true);
    }
    setCatFoods(_catFoods);
  }

  function resetCalcValue() {
    setCalories(0);
    setWeight(0);
  }

  function onCaloriesChange(calories: number) {
    if (calories) {
      const catFoodId = getValues('catFood');
      if (catFoodId) {
        const catFood = catFoods.find(_catFood => _catFood.id === catFoodId);
        setCalories(calories);
        setWeight(parseFloat(((calories / catFood!.calories) * 100).toFixed(1)));
        return;
      }
    }
    setCalories(0);
    setWeight(0);
  }

  function onWeightChange(weight: number) {
    if (weight) {
      const catFoodId = getValues('catFood');
      if (catFoodId) {
        const catFood = catFoods.find(_catFood => _catFood.id === catFoodId);
        setWeight(0);
        setCalories(parseFloat((weight * (catFood!.calories / 100)).toFixed(1)));
        return;
      }
    }
    setWeight(0);
    setCalories(0);
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
        weight: eatingWeight,
        time: dateTime,
      })
    );
    props.navigation.goBack();
  }

  return (
    <View style={AddEatingRecordStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={AddEatingRecordStyle.topBlock}>
          <CatPhotoButton size={55} image={catImage} style={AddEatingRecordStyle.catImage} />
          <MfcButton
            color="gray"
            style={AddEatingRecordStyle.addCatFoodButton}
            iconName="add"
            textStyle={CommonStyle.grayText}
            onPress={() => props.navigation.navigate('AddCustomFood')}>
            新增自定義食物資訊
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
                    resetCalcValue();
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
                  getCatFoods(value as string);
                  if (getValues('catFood')) {
                    setValue('catFood', null);
                    resetCalcValue();
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
                  resetCalcValue();
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
        {calcType === 'calroies' ? (
          <>
            <InputLabel label="卡路里" />
            <View style={AddEatingRecordStyle.calcBlock}>
              <View style={AddEatingRecordStyle.caloryContainer}>
                <MfcTextInput
                  keyboardType="number-pad"
                  value={eatingCalories ? eatingCalories.toString() : ''}
                  onChange={value => onCaloriesChange(parseInt(value, 10))}
                  containerStyle={AddEatingRecordStyle.caloryInput}
                  disabled={!watch('catFood')}
                />
                <View style={AddEatingRecordStyle.weight}>
                  <MfcText size="large" type="medium">
                    = {eatingWeight} g
                  </MfcText>
                </View>
              </View>
              <TouchableOpacity onPress={() => setCalcType('weight')} style={AddEatingRecordStyle.exchangeButton}>
                <MfcIcon name="transfer" />
              </TouchableOpacity>
            </View>
            <MfcText style={[AddEatingRecordStyle.formField, CommonStyle.grayText]}>
              今日尚未進食: {remainCalories} cal
            </MfcText>
          </>
        ) : (
          <>
            <InputLabel label="重量" />
            <View style={AddEatingRecordStyle.calcBlock}>
              <View style={AddEatingRecordStyle.caloryContainer}>
                <MfcTextInput
                  keyboardType="number-pad"
                  value={eatingWeight ? eatingWeight.toString() : ''}
                  onChange={value => onWeightChange(parseInt(value, 10))}
                  containerStyle={AddEatingRecordStyle.caloryInput}
                  disabled={!watch('catFood')}
                />
                <View style={AddEatingRecordStyle.weight}>
                  <MfcText size="large" type="medium">
                    = {eatingCalories} cal
                  </MfcText>
                </View>
              </View>
              <TouchableOpacity onPress={() => setCalcType('calroies')} style={AddEatingRecordStyle.exchangeButton}>
                <MfcIcon name="transfer" />
              </TouchableOpacity>
            </View>

            <MfcText style={[AddEatingRecordStyle.formField, CommonStyle.grayText]}>
              今日尚未進食: {remainCalories} cal
            </MfcText>
          </>
        )}
      </ScrollView>
      <ButtonList>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton color="primary" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
          確定餵食
        </MfcButton>
      </ButtonList>
      <Alert visable={showAlert} onClose={() => toggleAlert(false)} message={alertMessage} />
    </View>
  );
};
