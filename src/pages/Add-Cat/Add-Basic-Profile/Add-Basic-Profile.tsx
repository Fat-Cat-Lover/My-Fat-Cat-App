import React from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { AddBasicProfileStyle } from './Add-Basic-Profile.style';
import { MfcButton } from 'components/Button/Button';
import { AddCatProgressBar } from '../components/Add-Cat-Progress-Bar/Add-Cat-Progress-Bar';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { AddBasicProfileProps } from './Add-Basic-Profile.interface';
import { DefaultCatsImages } from 'common/default-cat-images';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { SexSelector } from 'components/Sex-Selector/Sex-Selector';
import { CommonStyle } from 'styles/common-style';

export const AddBasicProfile: React.FC<AddBasicProfileProps> = props => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  let image: ImageSourcePropType;
  if (props.route.params) {
    const { photo, useDefault } = props.route.params;
    if (photo) {
      image = { uri: photo };
    } else if (useDefault) {
      image = DefaultCatsImages[useDefault];
    } else {
      throw new Error('No image select');
    }
  } else {
    throw new Error('No image select');
  }

  function navBack() {
    props.navigation.goBack();
  }

  function onSubmit(datas: FieldValues) {
    console.log(datas);
  }

  return (
    <View style={AddBasicProfileStyle.container}>
      <AddCatProgressBar currnetStep={2} totalStep={3} />
      <View style={AddBasicProfileStyle.contentContainer}>
        <ScrollView
          contentContainerStyle={AddBasicProfileStyle.formContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <CatPhotoButton image={image} disabled={true} />
          <MfcHeaderText size="large" type="medium" style={[AddBasicProfileStyle.title, CommonStyle.grayText]}>
            輸入貓咪基本資料
          </MfcHeaderText>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="寵物名稱"
                placeholder="16 字內的寵物名稱"
                value={field.value}
                onChange={field.onChange}
                required={true}
                containerStyle={AddBasicProfileStyle.formField}
              />
            )}
            defaultValue=""
            rules={{ required: true }}
          />
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="年齡"
                placeholder="現在幾歲"
                value={field.value}
                onChange={field.onChange}
                required={true}
                containerStyle={AddBasicProfileStyle.formField}
              />
            )}
            defaultValue=""
            rules={{ required: true }}
          />
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <BaseInput required={true} style={AddBasicProfileStyle.formField} label="性別">
                <SexSelector onPress={field.onChange} value={field.value} />
              </BaseInput>
            )}
            defaultValue=""
            rules={{ required: true }}
          />
          <Controller
            name="currentWeight"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="現在體重(kg)"
                placeholder="現在體重幾公斤"
                value={field.value}
                onChange={field.onChange}
                required={true}
                containerStyle={AddBasicProfileStyle.formField}
              />
            )}
            defaultValue=""
            rules={{ required: true }}
          />
          <Controller
            name="targetWeight"
            control={control}
            render={({ field }) => (
              <MfcTextInput
                label="目標公斤數(kg)"
                placeholder="希望可以達到的目標體重幾公斤"
                value={field.value}
                onChange={field.onChange}
                required={true}
                containerStyle={AddBasicProfileStyle.formField}
              />
            )}
            rules={{ required: true }}
          />
        </ScrollView>
        <View style={AddBasicProfileStyle.buttonContainer}>
          <MfcButton color="white" onPress={navBack} style={AddBasicProfileStyle.button}>
            取消
          </MfcButton>
          <View style={AddBasicProfileStyle.buttonSpace} />
          <MfcButton
            color="primary"
            style={AddBasicProfileStyle.button}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}>
            繼續
          </MfcButton>
        </View>
      </View>
    </View>
  );
};
