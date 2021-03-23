import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const MfcTextInputStyle = StyleSheet.create({
  constainer: {
    flex: 1,
    marginVertical: 4,
  },
  label: {
    marginVertical: spacings.spacing1,
  },
  textInput: {
    borderRadius: 8,
    borderColor: colors.lightGray,
    paddingHorizontal: spacings.spacing5,
    fontFamily: 'NotoSansTC-Medium',
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
