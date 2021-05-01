import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const CheckboxStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacings.spacing5,
    borderColor: colors.lightGray,
    borderWidth: 1,
  },
  unchecked: {
    backgroundColor: 'transparent',
  },
  checked: {
    backgroundColor: colors.lightWhite,
  },
  checkmark: {
    marginRight: spacings.spacing1,
  },
});
