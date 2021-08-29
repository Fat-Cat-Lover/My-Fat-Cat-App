import React from 'react';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { MfcTextArea } from 'components/Text-Area/Mfc-Text-Area';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { StackScreenProps } from '@react-navigation/stack';
import { ButtonList } from 'components/Button-List/Button-List';
import { MfcButton } from 'components/Button/Button';
import spacings from 'styles/spacings';

export const ContactUs: React.FC<StackScreenProps<any, any>> = props => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [content, setContent] = useState<string>();

  return (
    <View style={{ padding: spacings.spacing5, flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <MfcTextInput label="您的名字" required={true} value={name} onChange={setName} placeholder="輸入您的名字" />
        <MfcTextInput
          label="您的 E-mail"
          required={true}
          value={email}
          onChange={setEmail}
          placeholder="example@gmail.com"
          containerStyle={{ marginVertical: 18 }}
        />
        <MfcTextArea label="您想要跟我們說什麼？ *" value={content} onChange={setContent} placeholder="輸入您的訊息" />
      </ScrollView>
      <ButtonList style={{ marginTop: spacings.spacing5 }}>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton>送出</MfcButton>
      </ButtonList>
    </View>
  );
};
