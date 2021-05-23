import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const CheckboxStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacings.spacing5,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 8,
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
