import React from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { MfcText } from 'components/Text/Text';
import { AlertStyle } from './Alert.style';
import { TouchableOpacity } from 'react-native';
import { CommonStyle } from 'styles/common-style';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { dismissAlert } from 'redux/alert/slice';

export const Alert: React.FC = () => {
  const { show, alertProps } = useRootSelector(state => state.alert);
  const dispatch = useRootDispatch();

  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={1}
      animationOutTiming={1}
      isVisible={show}
      onBackButtonPress={() => dispatch(dismissAlert)}
      onBackdropPress={() => dispatch(dismissAlert)}>
      <View style={AlertStyle.container}>
        <View style={AlertStyle.modal}>
          {alertProps?.message ? (
            <View style={AlertStyle.messageBlock}>
              <MfcText size="large" style={CommonStyle.grayText}>
                {alertProps.message}
              </MfcText>
            </View>
          ) : undefined}
          {alertProps?.buttons
            ? alertProps.buttons.map((button, i) => (
                <TouchableOpacity
                  style={AlertStyle.button}
                  onPress={() => {
                    if (button.onClick) {
                      button.onClick();
                    }
                    dispatch(dismissAlert());
                  }}
                  key={i}>
                  <MfcText type="medium" style={AlertStyle.text}>
                    {button.text}
                  </MfcText>
                </TouchableOpacity>
              ))
            : undefined}
        </View>
      </View>
    </Modal>
  );
};
