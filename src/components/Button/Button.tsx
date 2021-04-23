import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MfcText } from 'components/Text/Text';
import { MfcButtonProps } from './Button.interface';
import { ButtonColors, ButtonMainStyle } from './Button.style';

export const MfcButton: React.FC<MfcButtonProps> = props => {
  const buttonColor = props.color ? ButtonColors[props.color] : ButtonColors.primary;
  return (
    <TouchableOpacity
      style={[
        ButtonMainStyle.container,
        buttonColor.container,
        props.disabled ? ButtonMainStyle.disabled : undefined,
        props.style,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <MfcText type="medium" size="large" style={buttonColor.text}>
        {props.children}
      </MfcText>
    </TouchableOpacity>
  );
};
