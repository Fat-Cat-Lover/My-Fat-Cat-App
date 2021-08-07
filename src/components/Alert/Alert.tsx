import React from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { MfcText } from 'components/Text/Text';
import { AlertStyle } from './Alert.style';
import { TouchableOpacity } from 'react-native';
import { CommonStyle } from 'styles/common-style';

export const Alert: React.FC<{ message: string; visable: boolean; onClose: () => any }> = props => {
  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={1}
      animationOutTiming={1}
      isVisible={props.visable}
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}>
      <View style={AlertStyle.container}>
        <View style={AlertStyle.modal}>
          <View style={AlertStyle.messageBlock}>
            <MfcText size="large" style={CommonStyle.grayText}>
              {props.message}
            </MfcText>
          </View>
          <TouchableOpacity style={AlertStyle.button} onPress={props.onClose}>
            <MfcText type="medium" style={AlertStyle.text}>
              好的
            </MfcText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
