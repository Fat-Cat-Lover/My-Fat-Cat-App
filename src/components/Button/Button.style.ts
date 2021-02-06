import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import baseColors from 'styles/colors';

interface ButtonStyle {
  container: ViewStyle;
  text: TextStyle;
}

export const ButtonMainStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
