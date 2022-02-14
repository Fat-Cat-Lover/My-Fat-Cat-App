import React, { useState } from 'react';
import { View } from 'react-native';
import { SettingStyle } from './Setting.style';
import { MfcButton } from 'components/Button/Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcText } from 'components/Text/Text';
import { RootNavParams } from 'navigations';
import { CommonStyle } from 'styles/common-style';
import { version } from '../../../package.json';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParams } from './navigation.params';

type NavProps = CompositeScreenProps<StackScreenProps<SettingStackParams, 'setting'>, StackScreenProps<RootNavParams>>;

export interface SettingProps extends NavProps {}

export const Setting: React.FC<SettingProps> = props => {
  const [showInfo, toggleShowInfo] = useState<boolean>(false);
  const [showAbout, toggleShowAbout] = useState<boolean>(false);

  return (
    <View style={SettingStyle.container}>
      <MfcButton color="lightOrange" onPress={() => props.navigation.navigate('customFoodList', {})}>
        <View style={SettingStyle.buttonContentContainer}>
          <MfcText type="medium" size="large" style={CommonStyle.grayText}>
            自定義食物資訊列表
          </MfcText>
          <MfcIcon name="keyboardArrowRight" style={SettingStyle.icon} />
        </View>
      </MfcButton>
      <View style={SettingStyle.infoBlock}>
        <MfcButton color="white" onPress={() => toggleShowInfo(!showInfo)}>
          <View style={SettingStyle.buttonContentContainer}>
            <MfcText type="medium" size="large" style={CommonStyle.grayText}>
              App 資訊
            </MfcText>
            <MfcIcon name={showInfo ? 'expandBack' : 'expandMore'} style={SettingStyle.icon} />
          </View>
        </MfcButton>
        {showInfo ? (
          <View style={SettingStyle.infoContent}>
            <MfcText style={CommonStyle.grayText}>目前版本： {version}</MfcText>
          </View>
        ) : undefined}
      </View>
      <View style={SettingStyle.infoBlock}>
        <MfcButton color="white" onPress={() => toggleShowAbout(!showAbout)}>
          <View style={SettingStyle.buttonContentContainer}>
            <MfcText type="medium" size="large" style={CommonStyle.grayText}>
              關於我們
            </MfcText>
            <MfcIcon name={showAbout ? 'expandBack' : 'expandMore'} style={SettingStyle.icon} />
          </View>
        </MfcButton>
        {showAbout ? (
          <View style={SettingStyle.infoContent}>
            <MfcText style={CommonStyle.grayText}>
              我們是三個在電商以及新創工作的工作者，由於家裡的貓主子太胖了被說需要減肥，因此發想並設計了這個 APP
              來解決每日計算的任務，一起來幫助貓貓減肥吧！歡迎聯絡我們並給我們建議。
            </MfcText>
          </View>
        ) : undefined}
      </View>
    </View>
  );
};
