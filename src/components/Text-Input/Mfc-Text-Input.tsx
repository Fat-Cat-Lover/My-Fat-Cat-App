import React from 'react';
import { MfcText } from 'components/Text/Text';
import { Keyboard, TextInput, TextStyle, View } from 'react-native';
import { MfcTextInputProps } from './Mfc-Text-Input.interface';
import { MfcTextInputStyle } from './Mfc-Text-Input.style';
import colors from 'styles/colors';
import { InputLabel } from 'components/Input-Label/Input-Label';

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
    this.props.onChange(text);
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        {this.props.label && <InputLabel label={this.props.label} required={this.props.required} />}
        <TextInput
          keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
          placeholder={this.props.placeholder}
          placeholderTextColor={colors.mainGray}
          style={[
            MfcTextInputStyle.textInput,
            this.state.inputStyle,
            this.props.disabled ? MfcTextInputStyle.disabled : undefined,
            this.props.errorMessage ? MfcTextInputStyle.errorBorder : undefined,
          ]}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={this.ref}
          textAlignVertical="center"
          value={this.props.value}
          editable={!this.props.disabled}
        />
        {this.props.errorMessage ? (
          <View style={MfcTextInputStyle.errorMessageContainer}>
            <MfcText size="small" type="medium" style={MfcTextInputStyle.errorMessage}>
              {this.props.errorMessage}
            </MfcText>
          </View>
        ) : undefined}
      </View>
    );
  }
}
