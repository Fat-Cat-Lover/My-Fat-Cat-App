import React from 'react';
import { MfcText } from 'components/Text/Text';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MfcTextInputProps } from './Mfc-Text-Input.interface';
import { MfcTextInputStyle } from './Mfc-Text-Input.style';
import colors from 'styles/colors';
import { BaseInput } from 'components/Base-Input/Base-Input';

export const MfcTextInput: React.FC<MfcTextInputProps> = props => {
  const [inputStyle, setInputStyle] = React.useState(MfcTextInputStyle.emptyInput);

  React.useEffect(() => {
    if (props.value) {
      setInputStyle(MfcTextInputStyle.filledInput);
    }
  }, []);

  function onFocus() {
    if (!props.value) {
      setInputStyle(MfcTextInputStyle.filledInput);
    }

    if (props.onFocus) {
      props.onFocus();
    }
  }

  function onBlur() {
    if (!props.value) {
      setInputStyle(MfcTextInputStyle.emptyInput);
    }

    if (props.onBlur) {
      props.onBlur();
    }
  }

  function onChangeText(text: string) {
    props.onTextChange(text);
  }

  return (
    <BaseInput label={props.label}>
      <TextInput
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        placeholderTextColor={colors.mainGray}
        style={[
          MfcTextInputStyle.textInput,
          inputStyle,
          props.errorMessage ? MfcTextInputStyle.errorBorder : undefined,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={props.value}
      />
      {props.errorMessage && (
        <View style={MfcTextInputStyle.errorMessageContainer}>
          <MfcText style={MfcTextInputStyle.errorMessage}>{props.errorMessage}</MfcText>
        </View>
      )}
    </BaseInput>
  );
};
