import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export const AddCatProgressBarStyle = StyleSheet.create({
  BarContainer: {
    borderRadius: 0,
  },
  barColor: {
    backgroundColor: colors.darkOrange,
  },
  stepText: {
    color: colors.darkOrange,
  },
});
