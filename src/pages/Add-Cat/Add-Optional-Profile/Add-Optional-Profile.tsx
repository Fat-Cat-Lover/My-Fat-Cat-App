import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AddCatProgressBar } from '../components/Add-Cat-Progress-Bar/Add-Cat-Progress-Bar';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { View } from 'react-native';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';

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

export const AddOptionalProfile: React.FC = props => {
  const { control } = useForm<OptionalForm>({ resolver: yupResolver(schema) });
  return (
    <View>
      <AddCatProgressBar currnetStep={3} totalStep={3} />
      <View>
        <Controller
          name="isNeuter"
          control={control}
          render={({ field }) => (
            <BaseInput label="寵物結紮">
              <View>
                <Checkbox value="沒結紮" onChange={() => field.onChange(false)} checked={field.value === false} />
                <Checkbox value="已經結紮" onChange={() => field.onChange(true)} checked={field.value} />
              </View>
            </BaseInput>
          )}
        />
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <BaseInput label="好動程度">
              <View>
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
        />
        <Controller
          name="latestHealthCheckDate"
          control={control}
          render={({field}) => (
            <BaseInput>
            </BaseInput>
          )}
        />
      </View>
      <View />
    </View>
  );
};
