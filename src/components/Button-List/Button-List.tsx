import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ButtonListStyle } from './Button-List.style';

interface ButtonListProps {
  style?: StyleProp<ViewStyle>;
}

export const ButtonList: React.FC<ButtonListProps> = props => {
  return (
    <View style={[ButtonListStyle.container, props.style]}>
      {React.Children.map(props.children, (child, index) => {
        let style: ViewStyle;
        if (index === 0) {
          style = ButtonListStyle.first;
        } else if (index === React.Children.count(props.children) - 1) {
          style = ButtonListStyle.last;
        } else {
          style = ButtonListStyle.remain;
        }
        return <View style={[ButtonListStyle.item, style]}>{child}</View>;
      })}
    </View>
  );
};
