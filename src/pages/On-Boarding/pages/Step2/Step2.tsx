import React from 'react';
import { View } from 'react-native';
import { MfcButton } from 'components/Button/Button';
import { OnBoardingTemplate } from 'pages/On-Boarding/components/On-Boarding-Template/On-Boarding-Template';
import { Step } from 'pages/On-Boarding/components/Step/Step';
import { StackScreenProps } from '@react-navigation/stack';

type Step2Props = StackScreenProps<{ step3: undefined }>;

export const Step2: React.FC<Step2Props> = props => {
  return (
    <OnBoardingTemplate
      image={require('assets/images/others/step2.png')}
      title="自動帶入大廠貓食資訊"
      subTitle="也可以快速匯入建立自己的食物資料"
      navigationBlock={
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Step step={2} />
          <MfcButton style={{ width: '50%' }} onPress={() => props.navigation.navigate('step3')}>
            Next
          </MfcButton>
        </View>
      }
    />
  );
};
