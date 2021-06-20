import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MfcButton } from 'components/Button/Button';
import { ProgressButtonStyle } from './Progress-Button.style';
import { ProgressButtonProps } from './Progress-Button.interface';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { ProgressBar } from 'components/Progress-Bar/Progress-Bar';
import { MfcText } from 'components/Text/Text';

export const ProgressButton: React.FC<ProgressButtonProps> = props => {
  return (
    <TouchableOpacity style={ProgressButtonStyle.container} onPress={props.onPress}>
      <View style={ProgressButtonStyle.content}>
        <View>
          <MfcIcon name={props.icon} />
        </View>
        <View style={ProgressButtonStyle.progressBarText}>
          <MfcText size="large">{props.progressText}</MfcText>
        </View>
        <ProgressBar
          progress={props.progress <= 1 ? props.progress : 1}
          barColor={props.progressBarColor}
          barStyle={ProgressButtonStyle.progressBar}
        />
      </View>
      <MfcButton color={props.buttonColor} onPress={props.onPress}>
        {props.buttonText}
      </MfcButton>
    </TouchableOpacity>
  );
};
