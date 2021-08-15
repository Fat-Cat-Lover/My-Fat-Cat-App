import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const AlertStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    borderRadius: 8,
    backgroundColor: colors.lightWhite,
  },
  messageBlock: {
    paddingHorizontal: spacings.spacing5,
    paddingVertical: spacings.spacing7,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  button: {
    padding: spacings.spacing5,
    alignItems: 'center',
  },
  text: {
    color: colors.darkOrange,
  },
});
