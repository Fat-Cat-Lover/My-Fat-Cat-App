import React, { useState } from 'react';
import { View } from 'react-native';
import { SettingStyle } from './Setting.style';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MfcButton } from 'components/Button/Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcText } from 'components/Text/Text';
import { RootNavParams } from 'navigations';
import { CommonStyle } from 'styles/common-style';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { version } from '../../../package.json';

type NavProps = BottomTabScreenProps<RootNavParams, 'TabBar'>;

export interface SettingProps extends NavProps {}

export const Setting: React.FC<SettingProps> = props => {
  const [showInfo, toggleShowInfo] = useState<boolean>(false);
  const [showAbout, toggleShowAbout] = useState<boolean>(false);

  return (
    <View>
      <HeaderBar>設定</HeaderBar>
      <View style={SettingStyle.container}>
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
        {/* <MfcButton color="white" onPress={() => props.navigation.navigate('contactUs')} style={SettingStyle.infoBlock}>
        <View style={SettingStyle.buttonContentContainer}>
          <MfcText type="medium" size="large" style={CommonStyle.grayText}>
            聯絡我們
          </MfcText>
          <MfcIcon name="keyboardArrowRight" style={SettingStyle.icon} />
        </View>
      </MfcButton> */}
      </View>
    </View>
  );
};
