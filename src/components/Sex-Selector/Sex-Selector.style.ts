import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export const SexSelectorStyle = StyleSheet.create({
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sexButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sexButton: {
    borderWidth: 5,
    borderColor: colors.lightWhite,
  },
  sexButtonSpace: {
    width: 60,
  },
  checkmark: {
    position: 'absolute',
  },
});
