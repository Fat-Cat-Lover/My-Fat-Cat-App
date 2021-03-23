import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const MfcTextAreaStyle = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    borderColor: colors.lightGray,
    paddingHorizontal: spacings.spacing5,
    fontFamily: 'NotoSansTC-Medium',
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
});
