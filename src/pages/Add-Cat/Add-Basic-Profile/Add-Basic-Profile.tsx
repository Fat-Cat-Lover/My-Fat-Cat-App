import React from 'react';
import { View } from 'react-native';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { Controller, useForm } from 'react-hook-form';

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
            value={field.value}
            onChange={value => field.onChange(value)}
            required={true}
          />
        )}
        defaultValue=""
      />
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <MfcTextInput label="年齡" value={field.value} onChange={value => field.onChange(value)} required={true} />
        )}
        defaultValue=""
      />
      <Controller
       />
    </View>
  );
};
