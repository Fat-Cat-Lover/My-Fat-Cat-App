import React from 'react';
import { View } from 'react-native';
import { MfcButton } from 'components/Button/Button';
import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Image } from 'react-native';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcText } from 'components/Text/Text';
import { CommonStyle } from 'styles/common-style';
import { OnBoardingStyle } from './On-Boarding.style';
import { Step } from '../components/Step/Step';

const steps = [
  {
    image: require('assets/images/others/step1.png'),
    title: '自動換算公克數跟卡路里',
    subtitle: '不用再自己按計算機',
  },
  {
    image: require('assets/images/others/step2.png'),
    title: '自動帶入大廠貓食資訊',
    subtitle: '也可以快速匯入建立自己的食物資料',
  },
  {
    image: require('assets/images/others/step3.png'),
    title: '輕鬆紀錄貓咪體重變化表',
    subtitle: '快來一起幫愛貓保持健康吧！',
  },
];

type OnBoardProps = StackScreenProps<{ addCat: undefined }>;

export const OnBoarding: React.FC<OnBoardProps> = props => {
  const [step, setStep] = useState<number>(0);

  return (
    <View style={OnBoardingStyle.container}>
      <Swipeable
        onSwipeableRightOpen={() => {
          console.log('swipe right')
          if (step > 0) setStep(step - 1);
        }}
        onSwipeableLeftOpen={() => {
          if (step < 2) setStep(step + 1);
        }}>
        <View>
          <Image source={steps[step].image} />
        </View>
        <View style={OnBoardingStyle.title}>
          <MfcHeaderText size="large" type="medium" style={CommonStyle.grayText}>
            {steps[step].title}
          </MfcHeaderText>
          <MfcText size="large" style={CommonStyle.grayText}>
            {steps[step].subtitle}
          </MfcText>
        </View>
        <View>
          {step < 2 ? (
            <View style={OnBoardingStyle.stepBlock}>
              <Step step={step + 1} />
              <MfcButton style={OnBoardingStyle.nextButton} onPress={() => setStep(step + 1)}>
                Next
              </MfcButton>
            </View>
          ) : (
            <View>
              <MfcButton style={OnBoardingStyle.finishButton} onPress={() => props.navigation.navigate('addCat')}>
                開始記錄
              </MfcButton>
            </View>
          )}
        </View>
      </Swipeable>
    </View>
  );
};
