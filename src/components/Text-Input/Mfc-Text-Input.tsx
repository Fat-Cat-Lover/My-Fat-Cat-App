import React from 'react';
import { MfcText } from 'components/Text/Text';
import { Keyboard, TextInput, TextStyle, View } from 'react-native';
import { MfcTextInputProps } from './Mfc-Text-Input.interface';
import { MfcTextInputStyle } from './Mfc-Text-Input.style';
import colors from 'styles/colors';
import { BaseInput } from 'components/Base-Input/Base-Input';

export class MfcTextInput extends React.Component<MfcTextInputProps, { inputStyle: TextStyle }> {
  ref: React.RefObject<TextInput>;
  constructor(props: MfcTextInputProps) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    const initStyle = props.value ? MfcTextInputStyle.filledInput : MfcTextInputStyle.emptyInput;
    this.state = {
      inputStyle: initStyle,
    };
    this.ref = React.createRef();
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', () => {
      this.ref.current?.blur();
    });
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', () => {
      this.ref.current?.blur();
    });
  }

  onFocus() {
    if (!this.props.value) {
      this.setState({
        inputStyle: MfcTextInputStyle.filledInput,
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    if (!this.props.value) {
      this.setState({
        inputStyle: MfcTextInputStyle.emptyInput,
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onChangeText(text: string) {
    this.props.onTextChange(text);
  }

  render() {
    return (
      <BaseInput label={this.props.label}>
        <TextInput
          keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
          placeholderTextColor={colors.mainGray}
          style={[
            MfcTextInputStyle.textInput,
            this.state.inputStyle,
            this.props.errorMessage ? MfcTextInputStyle.errorBorder : undefined,
          ]}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          caretHidden={true}
          ref={this.ref}
          value={this.props.value}
        />
        {this.props.errorMessage && (
          <View style={MfcTextInputStyle.errorMessageContainer}>
            <MfcText style={MfcTextInputStyle.errorMessage}>{this.props.errorMessage}</MfcText>
          </View>
        )}
      </BaseInput>
    );
  }
}
