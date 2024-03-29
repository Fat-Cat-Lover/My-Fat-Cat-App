import React from 'react';
import { EmitterSubscription, Keyboard, TextInput, TextStyle, View } from 'react-native';
import colors from 'styles/colors';
import { InputLabel } from 'components/Input-Label/Input-Label';
import { MfcTextAreaProps } from './Mfc-Text-Area.interface';
import { MfcTextAreaStyle } from './Mfc-Text-Area.style';

export class MfcTextArea extends React.Component<MfcTextAreaProps, { inputStyle: TextStyle }> {
  ref: React.RefObject<TextInput>;
  keyboardListener: EmitterSubscription;
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
    this.keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      this.ref.current?.blur();
    });
  }

  componentWillUnmount() {
    this.keyboardListener.remove();
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
    this.props.onChange(text);
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        {this.props.label && <InputLabel label={this.props.label} />}
        <TextInput
          multiline={true}
          keyboardType="default"
          placeholder={this.props.placeholder}
          placeholderTextColor={colors.mainGray}
          style={[MfcTextAreaStyle.textInput, this.state.inputStyle, this.props.inputStyle]}
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
      </View>
    );
  }
}
