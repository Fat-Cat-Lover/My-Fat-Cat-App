import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const SelectInputStyle = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: spacings.spacing5,
    fontFamily: 'NotoSansTC-Medium',
    fontSize: 16,
    lineHeight: 23.17,
  },
});
