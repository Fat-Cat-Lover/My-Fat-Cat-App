import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const PetTagStyle = StyleSheet.create({
  container: {
    paddingHorizontal: spacings.spacing1,
    paddingVertical: 6,
    backgroundColor: colors.lightWhite,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.darkOrange,
  },
  content: {
    color: colors.darkOrange,
  },
});
