import React from 'react';
import { View } from 'react-native';
import { RoundImageButton } from 'components/Round-Button/Round-Button';
import { SexIcon } from 'components/Sex-Icon/Sex-Icon';
import { SexSelectorStyle } from './Sex-Selector.style';
import { SexSelectorProps } from './Sex-Selector.interface';
import { SelectedCheckmark } from 'components/Selected-Checkmark/Selected-Checkmark';

export const SexSelector: React.FC<SexSelectorProps> = props => {
  return (
    <View style={SexSelectorStyle.selectorContainer}>
      <View style={SexSelectorStyle.sexButtonContainer}>
        <RoundImageButton size={45} onPress={() => props.onPress('male')}>
          <SexIcon size={45} sex="male" style={SexSelectorStyle.sexButton} />
        </RoundImageButton>
        {props.value === 'male' ? <SelectedCheckmark style={SexSelectorStyle.checkmark} size={45} /> : undefined}
      </View>
      <View style={SexSelectorStyle.sexButtonSpace} />
      <View style={SexSelectorStyle.sexButtonContainer}>
        <RoundImageButton size={45} onPress={() => props.onPress('female')}>
          <SexIcon size={45} sex="female" style={SexSelectorStyle.sexButton} />
        </RoundImageButton>
        {props.value === 'female' ? <SelectedCheckmark style={SexSelectorStyle.checkmark} size={45} /> : undefined}
      </View>
    </View>
  );
};
