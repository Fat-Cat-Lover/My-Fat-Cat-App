import React from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { TabBarStyle } from './Tab-Bar.style';
import { MfcText } from 'components/Text/Text';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconName } from 'components/MFC-Icon/MFC-icon.interface';

interface TabBarProps extends BottomTabBarProps {
  routes: {
    label: string;
    icon: IconName;
  }[];
}

function createTabIcon(
  props: { focused: boolean; color: string; size: number },
  iconName: 'home' | 'bookmark' | 'pet' | 'setting'
) {
  return <MfcIcon name={iconName} style={{ tintColor: props.color }} />;
}

export const TabBar: React.FC<TabBarProps> = props => {
  return (
    <View style={TabBarStyle.container}>
      {props.state.routes.map((route, i) => {
        const isFocused = props.state.index === i;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate({ name: route.name, merge: true, params: {} });
          }
        };

        return (
          <View style={TabBarStyle.tabBarButtonContainer}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}>
              <View style={TabBarStyle.tabBarButtonContent}>
                <MfcIcon
                  name={props.routes[i].icon}
                  style={[TabBarStyle.iconColor, isFocused ? TabBarStyle.focusedIcon : undefined]}
                />
                <MfcText
                  size="normal"
                  type="medium"
                  style={[TabBarStyle.textColor, isFocused ? TabBarStyle.focusedText : undefined]}>
                  {props.routes[i].label}
                </MfcText>
              </View>
            </TouchableOpacity>
            {isFocused ? <MfcIcon name="catPunch" style={TabBarStyle.focusedMark} /> : undefined}
          </View>
        );
      })}
    </View>
  );
};
