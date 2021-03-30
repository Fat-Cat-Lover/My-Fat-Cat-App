import { SelectInput } from 'components/Select-Input/Select-Input';
import { MfcTextArea } from 'components/Text-Area/Mfc-Text-Area';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import React, { useState } from 'react';
import { View } from 'react-native';

export const Setting: React.FC = props => {
  const [input, setInput] = useState('');
  const [area, setArea] = useState('');

  return (
    <View style={{ padding: 16 }}>
      {/* <SelectInput
        options={[
          { label: 'cat', value: 'cat' },
          { label: 'dog', value: 'dog' },
        ]}
        selectedIndex={0}
        onChange={() => { }}
        placeholder="選擇貓咪"
      />
      <MfcTextInput
        value={input}
        onTextChange={text => {
          setInput(text);
        }}
        placeholder="Heelo"
      />
      <MfcTextArea
        value={area}
        onTextChange={text => {
          setArea(text);
        }}
        placeholder="Heelo"
      /> */}
    </View>
  );
};
