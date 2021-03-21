import React from 'react';
import { MfcText } from 'components/Text/Text';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MfcTextInputProps } from './Mfc-Text-Input.interface';
import { MfcTextInputStyle } from './Mfc-Text-Input.style';
import colors from 'styles/colors';

export const MfcTextInput: React.FC<MfcTextInputProps> = props => {
  const [inputText, setInputText] = React.useState('');
  const [inputStyle, setInputStyle] = React.useState(MfcTextInputStyle.emptyInput);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (props.inputText) {
      setInputText(props.inputText);
      setInputStyle(MfcTextInputStyle.filledInput);
    }
  }, []);

  function onFocus() {
    if (!inputText) {
      setInputStyle(MfcTextInputStyle.filledInput);
    }
  }

  function onBlur() {
    if (!inputText) {
      setInputStyle(MfcTextInputStyle.emptyInput);
    } else {
      if (props.validation) {
        const error = props.validation(inputText);
        if (error?.errorMessage) {
          setErrorMessage(errorMessage);
        }
      }
    }
  }

  return (
    <View style={MfcTextInputStyle.constainer}>
      {props.label && <MfcText style={MfcTextInputStyle.label}>{props.label}</MfcText>}
      <TextInput
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        placeholderTextColor={colors.mainGray}
        style={[MfcTextInputStyle.textInput, inputStyle, errorMessage ? MfcTextInputStyle.errorBorder : undefined]}
        onFocus={onFocus}
        onBlur={onBlur}
        value={inputText}
      />
      {errorMessage && <MfcText style={MfcTextInputStyle.errorMessage}>{errorMessage}</MfcText>}
    </View>
  );
};
