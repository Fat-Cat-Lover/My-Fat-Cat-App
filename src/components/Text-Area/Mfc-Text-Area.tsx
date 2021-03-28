import React from 'react';
import { Keyboard, TextInput, TextStyle } from 'react-native';
import colors from 'styles/colors';
import { BaseInput } from 'components/Base-Input/Base-Input';
import { MfcTextAreaProps } from './Mfc-Text-Area.interface';
import { MfcTextAreaStyle } from './Mfc-Text-Area.style';

export class MfcTextArea extends React.Component<MfcTextAreaProps, { inputStyle: TextStyle }> {
  ref: React.RefObject<TextInput>;
  constructor(props: MfcTextAreaProps) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    const initStyle = props.value ? MfcTextAreaStyle.filledInput : MfcTextAreaStyle.emptyInput;
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
        inputStyle: MfcTextAreaStyle.filledInput,
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    if (!this.props.value) {
      this.setState({
        inputStyle: MfcTextAreaStyle.emptyInput,
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
          keyboardType="default"
          placeholderTextColor={colors.mainGray}
          style={[MfcTextAreaStyle.textInput, this.state.inputStyle]}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          value={this.props.value}
          numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : 3}
          caretHidden={true}
          textAlignVertical="top"
          maxLength={this.props.maxLength}
          ref={this.ref}
        />
      </BaseInput>
    );
  }
}
