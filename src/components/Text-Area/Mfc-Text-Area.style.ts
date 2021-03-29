import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const MfcTextAreaStyle = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    // fontFamily: 'NotoSansTC-Medium',
    paddingHorizontal: spacings.spacing5,
    paddingVertical: spacings.spacing4,
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
