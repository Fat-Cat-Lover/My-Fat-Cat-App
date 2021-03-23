import React from 'react';
import { TextStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from 'styles/colors';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { MfcTextAreaProps } from './Mfc-Text-Area.interface';
import { MfcTextAreaStyle } from './Mfc-Text-Area.style';

export const MfcTextArea: React.FC<MfcTextAreaProps> = props => {
  const [inputStyle, setInputStyle] = React.useState<TextStyle>(MfcTextAreaStyle.emptyInput);

  React.useEffect(() => {
    if (props.value) {
      setInputStyle(MfcTextAreaStyle.filledInput);
    }
  }, []);

  function onFocus() {
    if (!props.value) {
      const style = props.filledInputStyle ? props.filledInputStyle : MfcTextAreaStyle.filledInput;
      setInputStyle(style);
    }

    if (props.onFocus) {
      props.onFocus();
    }
  }

  function onBlur() {
    if (!props.value) {
      const style = props.emptyInputStyle ? props.emptyInputStyle : MfcTextAreaStyle.emptyInput;
      setInputStyle(style);
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
        keyboardType="default"
        placeholderTextColor={colors.mainGray}
        style={[MfcTextAreaStyle.textInput, inputStyle]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={props.value}
        numberOfLines={props.numberOfLines}
        maxLength={props.maxLength}
      />
    </BaseInput>
  );
};
