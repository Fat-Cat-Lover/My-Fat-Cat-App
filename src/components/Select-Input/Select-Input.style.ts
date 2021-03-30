import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const SelectInputStyle = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.lightWhite,
    paddingHorizontal: spacings.spacing5,
    paddingVertical: spacings.spacing4,
    fontFamily: 'NotoSansTC-Medium',
    fontSize: 16,
    lineHeight: 23.17,
  },
  iconContainer: {
    padding: spacings.spacing4,
    paddingVertical: spacings.spacing5,
  },
  placeholder: {
    color: colors.black,
  },
});
