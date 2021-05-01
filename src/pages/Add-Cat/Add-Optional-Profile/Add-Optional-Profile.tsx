import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AddCatProgressBar } from '../components/Add-Cat-Progress-Bar/Add-Cat-Progress-Bar';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { View } from 'react-native';
import { DateInput } from '../components/Date-Input/Date-Input';
import { MfcTextArea } from 'components/Text-Area/Mfc-Text-Area';
import { AddOptionalProfileStyle } from './Add-Optional-Profile.style';
import { ScrollView } from 'react-native-gesture-handler';
import { MfcButton } from 'components/Button/Button';
import { AddOptionalProfileProps } from './Add-Optional-Profile.interface';

interface OptionalForm {
  isNeuter: boolean;
  active: 'active' | 'normal' | 'nonactive';
  latestHealthCheckDate: Date;
  description: string;
}

const schema = yup.object().shape({
  isNeuter: yup.boolean(),
  active: yup.mixed().oneOf(['active', 'normal', 'nonactive']),
  latestHealthCheckDate: yup.date(),
  description: yup.string(),
});

export const AddOptionalProfile: React.FC<AddOptionalProfileProps> = props => {
  const { control, handleSubmit } = useForm<OptionalForm>({ resolver: yupResolver(schema) });
  const basicProfile = props.route.params;

  function onSubmit(datas: OptionalForm) {
    console.log(datas);
  }

  return (
    <View style={AddOptionalProfileStyle.container}>
      <AddCatProgressBar currnetStep={3} totalStep={3} />
      <View style={AddOptionalProfileStyle.contentContainer}>
        <ScrollView contentContainerStyle={AddOptionalProfileStyle.formContent}>
          <Controller
            name="isNeuter"
            control={control}
            render={({ field }) => (
              <BaseInput label="寵物結紮" style={AddOptionalProfileStyle.formField}>
                <View style={AddOptionalProfileStyle.checkBoxContainer}>
                  <Checkbox value="沒結紮" onChange={() => field.onChange(false)} checked={field.value === false} />
                  <Checkbox value="已經結紮" onChange={() => field.onChange(true)} checked={field.value} />
                </View>
              </BaseInput>
            )}
            defaultValue=""
          />
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <BaseInput label="好動程度" style={AddOptionalProfileStyle.formField}>
                <View style={AddOptionalProfileStyle.checkBoxContainer}>
                  <Checkbox value="好動" onChange={() => field.onChange('active')} checked={field.value === 'active'} />
                  <Checkbox value="普通" onChange={() => field.onChange('normal')} checked={field.value === 'normal'} />
                  <Checkbox
                    value="不太動"
                    onChange={() => field.onChange('nonactive')}
                    checked={field.value === 'nonactive'}
                  />
                </View>
              </BaseInput>
            )}
            defaultValue=""
          />
          <Controller
            name="latestHealthCheckDate"
            control={control}
            render={({ field }) => (
              <BaseInput style={AddOptionalProfileStyle.formField}>
                <DateInput onChange={field.onChange} value={field.value} />
              </BaseInput>
            )}
            defaultValue=""
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <MfcTextArea
                onChange={field.onChange}
                value={field.value}
                containerStyle={AddOptionalProfileStyle.formField}
              />
            )}
          />
        </ScrollView>
      </View>
      <View style={AddOptionalProfileStyle.buttonContainer}>
        <MfcButton color="white" style={AddOptionalProfileStyle.button} onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton color="primary" style={AddOptionalProfileStyle.button} onPress={handleSubmit(onSubmit)}>
          完成
        </MfcButton>
      </View>
    </View>
  );
};
