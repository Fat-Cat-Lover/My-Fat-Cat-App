import { SelectInput } from 'components/Select-Input/Select-Input';
import { MfcTextArea } from 'components/Text-Area/Mfc-Text-Area';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import React from 'react';
import { View } from 'react-native';

export const Setting: React.FC = props => {
  return (
    <View style={{ padding: 16 }}>
      <SelectInput
        options={[
          { label: 'cat', value: 'cat' },
          { label: 'dog', value: 'dog' },
        ]}
        selectedIndex={0}
        onChange={() => {}}
      />

      <MfcTextInput label="hhhhhh" value="" onTextChange={() => {}} />
      <MfcTextArea value="" onTextChange={() => {}} />
    </View>
  );
};
