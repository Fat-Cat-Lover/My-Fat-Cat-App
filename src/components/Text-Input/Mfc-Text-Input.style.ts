import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const MfcTextInputStyle = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: spacings.spacing5,
    paddingVertical: spacings.spacing4,
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
