import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { AddEatingRecordProps } from './Add-Eating-Record.interface';
import { AddEatingRecordStyle } from './Add-Eating-Record.style';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { DefaultCatsImages } from 'common/default-cat-images';
import { MfcButton } from 'components/Button/Button';
import { CommonStyle } from 'styles/common-style';
import { ButtonList } from 'components/Button-List/Button-List';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { selectCats } from 'redux/cats/selector';
import { addEatingRecord } from 'redux/diary/slice';
import {
  EatingRecordForm,
  eatingRecordFormSchema,
  IEatingRecordForm,
} from '../components/Eating-Record-Form/Eating-Record-Form';
import { CatFoodDetail } from 'models/cat-food';
import { getCustomFoodDetail } from 'services/cat-food';
import { yupResolver } from '@hookform/resolvers/yup';

export const AddEatingRecord: React.FC<AddEatingRecordProps> = props => {
  const cats = useRootSelector(selectCats);
  const cat = cats.find(_cat => _cat.id === props.route.params.catId)!;
  const formMethods = useForm<IEatingRecordForm>({ mode: 'onChange', resolver: yupResolver(eatingRecordFormSchema) });
  const [customFood, setCustomFood] = useState<CatFoodDetail>();
  const dispatch = useRootDispatch();

  let catImage: ImageSourcePropType;
  if (cat.image) {
    catImage = { uri: cat.image };
  } else {
    catImage = DefaultCatsImages[cat.useDefault!];
  }

  useEffect(() => {
    if (props.route.params.newCustomFoodId) {
      getCustomFoodDetail(props.route.params.newCustomFoodId).then(food => {
        if (food) {
          setCustomFood(food);
        }
      });
    }
  }, [props.route.params.newCustomFoodId]);

  async function onSubmit(data: IEatingRecordForm) {
    await dispatch(
      addEatingRecord({
        catId: cat.id,
        foodType: data.foodType.food_type,
        brand: data.brand!.name,
        food: data.catFood!,
        weight: data.measurements.weight,
        time: data.datetime.toDate(),
        customFood: !!data.brand!.customFood,
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
        <FormProvider {...formMethods}>
          <EatingRecordForm
            cat={cat}
            date={props.route.params.date!}
            remainCalories={props.route.params.remainCalroies!}
            food={customFood}
            customFood={!!customFood}
          />
        </FormProvider>
      </ScrollView>
      <ButtonList style={AddEatingRecordStyle.buttonList}>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton
          color="primary"
          onPress={formMethods.handleSubmit(onSubmit)}
          disabled={!formMethods.formState.isValid}>
          確定餵食
        </MfcButton>
      </ButtonList>
    </View>
  );
};
