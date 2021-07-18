import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { DateInput } from 'components/Date-Input/Date-Input';
import { MfcTextArea } from 'components/Text-Area/Mfc-Text-Area';
import { AddOptionalProfileStyle } from './Add-Optional-Profile.style';
import { MfcButton } from 'components/Button/Button';
import { AddOptionalProfileProps } from './Add-Optional-Profile.interface';
import { ButtonList } from 'components/Button-List/Button-List';
import { InputLabel } from 'components/Input-Label/Input-Label';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { CommonStyle } from 'styles/common-style';
import { addCat } from 'redux/cats/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRootDispatch } from 'redux/hooks';
import { CommonActions } from '@react-navigation/native';

interface OptionalForm {
  [key: string]: any;
  isNeuter: boolean;
  active: 'active' | 'normal' | 'nonactive';
  latestHealthCheckDate: Date;
  description: string;
}

const schema = yup.object().shape({
  isNeuter: yup.boolean().required(),
  active: yup.string().oneOf(['active', 'normal', 'nonactive']).required(),
  latestHealthCheckDate: yup.date().optional(),
  description: yup.string().optional(),
});

export const AddOptionalProfile: React.FC<AddOptionalProfileProps> = props => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<OptionalForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const basicProfile = props.route.params;
  const dispatch = useRootDispatch();

  async function onSubmit(datas: OptionalForm) {
    const optionalDatas = {} as OptionalForm;
    for (let key in datas) {
      if (datas[key]) {
        optionalDatas[key] = datas[key];
      }
    }
    const cat = { ...basicProfile, ...optionalDatas };
    try {
      const result = await dispatch(addCat(cat));
      unwrapResult(result);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'TabBar' }],
        })
      );
      // props.navigation.navigate('TabBar', { screen: 'Home' })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={AddOptionalProfileStyle.container}>
      <ScrollView
        contentContainerStyle={AddOptionalProfileStyle.formContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <MfcHeaderText size="large" type="medium" style={[AddOptionalProfileStyle.title, CommonStyle.grayText]}>
          輸入其他資料
        </MfcHeaderText>
        <Controller
          name="isNeuter"
          control={control}
          render={({ field }) => (
            <View style={AddOptionalProfileStyle.formField}>
              <InputLabel label="寵物結紮" required={true} />
              <ButtonList>
                <Checkbox value="沒結紮" onChange={() => field.onChange(false)} checked={field.value === false} />
                <Checkbox value="已經結紮" onChange={() => field.onChange(true)} checked={field.value} />
              </ButtonList>
            </View>
          )}
        />
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <View style={AddOptionalProfileStyle.formField}>
              <InputLabel label="好動程度" required={true} />
              <ButtonList>
                <Checkbox value="好動" onChange={() => field.onChange('active')} checked={field.value === 'active'} />
                <Checkbox value="普通" onChange={() => field.onChange('normal')} checked={field.value === 'normal'} />
                <Checkbox
                  value="不太動"
                  onChange={() => field.onChange('nonactive')}
                  checked={field.value === 'nonactive'}
                />
              </ButtonList>
            </View>
          )}
        />
        <Controller
          name="latestHealthCheckDate"
          control={control}
          render={({ field }) => (
            <View style={AddOptionalProfileStyle.formField}>
              <DateInput
                label="上一次體檢日期（非必填）"
                onChange={field.onChange}
                value={field.value}
                placeholder="點我選日期"
              />
            </View>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <MfcTextArea
              label="關於貓咪的介紹（非必填）"
              onChange={field.onChange}
              value={field.value}
              placeholder="說點什麼你家貓貓的好話吧"
              containerStyle={AddOptionalProfileStyle.formField}
            />
          )}
        />
      </ScrollView>
      <ButtonList style={AddOptionalProfileStyle.buttonContainer}>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton disabled={!isValid} color="primary" onPress={handleSubmit(onSubmit)}>
          完成
        </MfcButton>
      </ButtonList>
    </View>
  );
};
