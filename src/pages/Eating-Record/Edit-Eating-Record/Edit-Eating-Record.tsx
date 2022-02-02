import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { DefaultCatsImages } from 'common/default-cat-images';
import { ButtonList } from 'components/Button-List/Button-List';
import { MfcButton } from 'components/Button/Button';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { CatFoodDetail } from 'models/cat-food';
import { showAlert } from 'redux/alert/slice';
import { deleteEatingRecord as deleteRecord, editEatingRecord } from 'redux/diary/slice';
import { useRootDispatch } from 'redux/hooks';
import { getCatFoodDetail, getCustomFoodDetail } from 'services/cat-food';
import {
  EatingRecordForm,
  eatingRecordFormSchema,
  IEatingRecordForm,
} from '../components/Eating-Record-Form/Eating-Record-Form';
import { EditEatingRecordProps } from './Edit-Eating-Record.interface';
import { EditEatingRecordStyle } from './Edit-Eating-Record.style';
import { CommonStyle } from 'styles/common-style';
import { yupResolver } from '@hookform/resolvers/yup';

export const EditEatingRecordPage: React.FC<EditEatingRecordProps> = props => {
  const record = props.route.params.record;
  const cat = props.route.params.cat;
  const formMethods = useForm<IEatingRecordForm>({ mode: 'onChange', resolver: yupResolver(eatingRecordFormSchema) });
  const [food, setFood] = useState<CatFoodDetail>();
  const dispatch = useRootDispatch();

  async function init() {
    try {
      let _food: CatFoodDetail | null;
      if (record.customFood) {
        _food = await getCustomFoodDetail(record.foodId);
      } else {
        _food = await getCatFoodDetail(record.foodId);
      }
      if (_food) {
        setFood(_food);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    init();
  }, []);

  let catImage: ImageSourcePropType;
  if (cat.image) {
    catImage = { uri: cat.image };
  } else {
    catImage = DefaultCatsImages[cat.useDefault!];
  }

  async function onSubmit(data: IEatingRecordForm) {
    await dispatch(
      editEatingRecord({
        recordId: record.id,
        time: data.datetime.toDate(),
        foodType: data.foodType.food_type,
        brand: data.brand!.name,
        food: data.catFood!,
        weight: data.measurements.weight,
        customFood: !!data.brand?.customFood,
      })
    );
    props.navigation.goBack();
  }

  async function deleteEatingRecord() {
    dispatch(
      showAlert({
        message: '你確定要刪除此筆資訊嗎？',
        buttons: [
          {
            text: '否',
          },
          {
            text: '是',
            onClick: async () => {
              props.navigation.goBack();
              await dispatch(deleteRecord(record.id));
            },
          },
        ],
      })
    );
  }

  return (
    <View style={EditEatingRecordStyle.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={EditEatingRecordStyle.eatingRecordFormContainer}>
        <View style={EditEatingRecordStyle.topBlock}>
          <CatPhotoButton size={55} image={catImage} style={EditEatingRecordStyle.catImage} />
        </View>
        <FormProvider {...formMethods}>
          <EatingRecordForm
            cat={props.route.params.cat}
            date={props.route.params.record.createdTime}
            remainCalories={props.route.params.remainCalories}
            food={food}
            customFood={record.customFood}
            weight={record.weight}
          />
        </FormProvider>
        <MfcButton iconName="cancel" color="gray" textStyle={CommonStyle.grayText} onPress={deleteEatingRecord}>
          刪除此筆餵食資訊
        </MfcButton>
      </ScrollView>
      <ButtonList>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton
          color="primary"
          onPress={formMethods.handleSubmit(onSubmit)}
          disabled={!formMethods.formState.isValid}>
          確定修改
        </MfcButton>
      </ButtonList>
    </View>
  );
};
