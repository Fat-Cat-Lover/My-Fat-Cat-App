import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export const LoadingStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightWhite,
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 13.5,
  },
});
