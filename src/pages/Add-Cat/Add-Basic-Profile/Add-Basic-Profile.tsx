import React from 'react';
import { View } from 'react-native';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { Controller, useForm } from 'react-hook-form';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { RoundImageButton } from 'components/Round-Button/Round-Button';
import { SexIcon } from 'components/Sex-Icon/Sex-Icon';
import { AddBasicProfileStyle } from './Add-Basic-Profile.style';

export const AddBasicProfile: React.FC = props => {
  const { control } = useForm();

  return (
    <View>
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
          />
        )}
        defaultValue=""
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
          />
        )}
        defaultValue=""
      />
      <Controller
        name="sex"
        control={control}
        render={({ field }) => (
          <BaseInput required={true}>
            <>
              <RoundImageButton onPress={() => field.onChange('male')}>
                <SexIcon sex="male" style={AddBasicProfileStyle.sexButton} />
              </RoundImageButton>
            </>
            <>
              <RoundImageButton onPress={() => field.onChange('female')}>
                <SexIcon sex="female" style={AddBasicProfileStyle.sexButton} />
              </RoundImageButton>
            </>
          </BaseInput>
        )}
        defaultValue=""
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
          />
        )}
        defaultValue=""
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
          />
        )}
      />
    </View>
  );
};
