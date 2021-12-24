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
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: spacings.spacing5,
    alignItems: 'center',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  text: {
    color: colors.darkOrange,
  },
});
