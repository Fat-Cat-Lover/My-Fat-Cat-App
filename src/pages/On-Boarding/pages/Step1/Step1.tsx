import React from 'react';
import { View } from 'react-native';
import { MfcButton } from 'components/Button/Button';
import { OnBoardingTemplate } from 'pages/On-Boarding/components/On-Boarding-Template/On-Boarding-Template';
import { Step } from 'pages/On-Boarding/components/Step/Step';
import { StackScreenProps } from '@react-navigation/stack';

type Step1Props = StackScreenProps<{ step2: undefined }>;

export const Step1: React.FC<Step1Props> = props => {
  return (
    <OnBoardingTemplate
      image={require('assets/images/others/step1.png')}
      title="自動換算公克數跟卡路里"
      subTitle="不用再自己按計算機"
      navigationBlock={
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Step step={1} />
          <MfcButton style={{ width: '50%' }} onPress={() => props.navigation.navigate('step2')}>
            Next
          </MfcButton>
        </View>
      }
    />
  );
};
