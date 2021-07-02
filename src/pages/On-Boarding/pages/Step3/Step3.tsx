import React from 'react';
import { View } from 'react-native';
import { MfcButton } from 'components/Button/Button';
import { OnBoardingTemplate } from 'pages/On-Boarding/components/On-Boarding-Template/On-Boarding-Template';
import { StackScreenProps } from '@react-navigation/stack';

type Step3Props = StackScreenProps<{ AddCat: undefined }>;

export const Step3: React.FC<Step3Props> = props => {
  return (
    <OnBoardingTemplate
      image={require('assets/images/others/step3.png')}
      title="輕鬆紀錄貓咪體重變化表"
      subTitle="快來一起幫愛貓保持健康吧！"
      navigationBlock={
        <View>
          <MfcButton style={{ width: '100%' }} onPress={() => props.navigation.navigate('AddCat')}>
            開始記錄
          </MfcButton>
        </View>
      }
    />
  );
};
