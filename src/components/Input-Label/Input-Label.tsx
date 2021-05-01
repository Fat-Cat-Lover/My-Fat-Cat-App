import React from 'react';
import { MfcText } from 'components/Text/Text';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import spacings from 'styles/spacings';

interface InputLabel {
  label: string;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
}

const style = StyleSheet.create({
  container: {
    marginBottom: spacings.spacing1,
  },
});

export const InputLabel: React.FC<InputLabel> = props => {
  return (
    <View style={[style.container, props.style]}>
      <MfcText>
        {props.label}
        {props.required ? ' *' : undefined}
      </MfcText>
    </View>
  );
};
