import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MfcText } from 'components/Text/Text';
import { MfcButtonProps } from './Button.interface';
import { ButtonColors, ButtonMainStyle } from './Button.style';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';

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
      <View style={ButtonMainStyle.contentContainer}>
        {props.iconName ? <MfcIcon style={ButtonMainStyle.icon} name={props.iconName} /> : undefined}
        <MfcText type="medium" size="large" style={[buttonColor.text, props.textStyle]}>
          {props.children}
        </MfcText>
      </View>
    </TouchableOpacity>
  );
};
