import { StyleSheet } from 'react-native';
import colors from './colors';
import spacings from './spacings';

export const InputStyle = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: spacings.spacing5,
    paddingVertical: spacings.spacing4,
  },
  text: {
    // fontFamily: 'NotoSansTC-Medium',
    fontSize: 16,
    lineHeight: 23.17,
  },
  emptyInput: {
    backgroundColor: colors.mainWhite,
  },
  filledInput: {
    backgroundColor: colors.lightWhite,
    color: colors.black,
  },
  errorBorder: {
    borderColor: colors.darkOrange,
  },
  errorMessageContainer: {
    paddingRight: spacings.spacing1,
    alignItems: 'flex-end',
  },
  errorMessage: {
    color: colors.darkOrange,
  },
});
