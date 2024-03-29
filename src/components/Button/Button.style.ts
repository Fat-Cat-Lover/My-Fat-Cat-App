import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import baseColors from 'styles/colors';
import spacings from 'styles/spacings';
import Spacings from 'styles/spacings';

interface ButtonStyle {
  container: ViewStyle;
  text: TextStyle;
}

export const ButtonMainStyle = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacings.spacing4,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    marginRight: spacings.spacing3,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const primary = StyleSheet.create<ButtonStyle>({
  container: {
    backgroundColor: baseColors.mainOrange,
  },
  text: {
    color: baseColors.black,
  },
});

const white = StyleSheet.create<ButtonStyle>({
  container: {
    backgroundColor: baseColors.lightWhite,
  },
  text: {
    color: baseColors.darkGray,
  },
});

const black = StyleSheet.create<ButtonStyle>({
  container: {
    backgroundColor: baseColors.darkGray,
  },
  text: {
    color: baseColors.mainWhite,
  },
});

const green = StyleSheet.create<ButtonStyle>({
  container: {
    backgroundColor: baseColors.lightGreen,
  },
  text: {
    color: baseColors.darkGray,
  },
});

const lightOrange = StyleSheet.create<ButtonStyle>({
  container: {
    backgroundColor: baseColors.lightOrange,
  },
  text: {
    color: baseColors.darkGray,
  },
});

const gray = StyleSheet.create<ButtonStyle>({
  container: {
    backgroundColor: baseColors.lightGray,
  },
  text: {
    color: baseColors.darkGray,
  },
});

export const ButtonColors = {
  primary: primary,
  white: white,
  black: black,
  green: green,
  lightOrange: lightOrange,
  gray: gray,
};
