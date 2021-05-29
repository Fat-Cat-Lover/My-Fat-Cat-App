import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const ImageSourceSelectStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    borderRadius: 8,
    backgroundColor: colors.lightWhite,
    paddingVertical: spacings.spacing1,
    paddingHorizontal: spacings.spacing5,
  },
  option: {
    paddingVertical: spacings.spacing1,
  },
});
