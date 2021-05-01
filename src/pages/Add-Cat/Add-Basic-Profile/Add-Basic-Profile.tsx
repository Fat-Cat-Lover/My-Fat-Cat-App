import React from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { Controller, useForm } from 'react-hook-form';
import { AddBasicProfileStyle } from './Add-Basic-Profile.style';
import { MfcButton } from 'components/Button/Button';
import { AddCatProgressBar } from '../components/Add-Cat-Progress-Bar/Add-Cat-Progress-Bar';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { AddBasicProfileProps } from './Add-Basic-Profile.interface';
import { DefaultCatsImages } from 'common/default-cat-images';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { SexSelector } from 'components/Sex-Selector/Sex-Selector';
import { CommonStyle } from 'styles/common-style';
import { InputLabel } from 'components/Input-Label/Input-Label';
import { ButtonList } from 'components/Button-List/Button-List';

interface ProfileForm {
  name: string;
  age: number;
  sex: 'male' | 'female';
  currentWeight: number;
  targetWeight: number;
}

const schema = yup.object().shape({
  name: yup.string().required('必填'),
  age: yup.number().typeError('需為數字').integer().positive().required('必填'),
  sex: yup.string().required('必填'),
  currentWeight: yup.number().typeError('需為數字').positive().required('必填'),
  targetWeight: yup.number().typeError('需為數字').positive().required('必填'),
});

export const AddBasicProfile: React.FC<AddBasicProfileProps> = props => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    trigger,
  } = useForm<ProfileForm>({ mode: 'onBlur', resolver: yupResolver(schema) });

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

  function onSubmit(datas: ProfileForm) {
    props.navigation.navigate('AddOptionalProfile', datas);
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
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="寵物名稱"
                placeholder="16 字內的寵物名稱"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                required={true}
                containerStyle={AddBasicProfileStyle.formField}
                errorMessage={fieldState.error && fieldState.error.message}
              />
            )}
            defaultValue=""
          />
          <Controller
            name="age"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="年齡"
                placeholder="現在幾歲"
                value={field.value ? field.value.toString() : ''}
                onChange={v => field.onChange(parseInt(v, 10))}
                onBlur={field.onBlur}
                required={true}
                containerStyle={AddBasicProfileStyle.formField}
                errorMessage={fieldState.error && fieldState.error.message}
                keyboardType="number-pad"
              />
            )}
            defaultValue=""
          />
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <View style={AddBasicProfileStyle.formField}>
                <InputLabel label="性別" required={true} />
                <SexSelector
                  onPress={sex => {
                    field.onChange(sex);
                    trigger('sex');
                  }}
                  value={field.value}
                />
              </View>
            )}
            defaultValue=""
          />
          <Controller
            name="currentWeight"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="現在體重(kg)"
                placeholder="現在體重幾公斤"
                value={field.value ? field.value.toString() : ''}
                onChange={v => field.onChange(parseFloat(v))}
                onBlur={field.onBlur}
                required={true}
                containerStyle={AddBasicProfileStyle.formField}
                errorMessage={fieldState.error && fieldState.error.message}
                keyboardType="number-pad"
              />
            )}
            defaultValue=""
          />
          <Controller
            name="targetWeight"
            control={control}
            render={({ field, fieldState }) => (
              <MfcTextInput
                label="目標公斤數(kg)"
                placeholder="希望可以達到的目標體重幾公斤"
                value={field.value ? field.value.toString() : ''}
                onChange={v => field.onChange(parseFloat(v))}
                onBlur={field.onBlur}
                required={true}
                containerStyle={AddBasicProfileStyle.formField}
                errorMessage={fieldState.error && fieldState.error.message}
                keyboardType="number-pad"
              />
            )}
          />
        </ScrollView>
        <ButtonList style={AddBasicProfileStyle.buttonContainer}>
          <MfcButton color="white" onPress={props.navigation.goBack}>
            取消
          </MfcButton>
          <MfcButton color="primary" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
            繼續
          </MfcButton>
        </ButtonList>
      </View>
    </View>
  );
};
