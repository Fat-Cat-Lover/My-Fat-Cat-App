import { StyleSheet } from 'react-native';
import Spacings from 'styles/spacings';

export const HeadBarStyle = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  headerSide: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacings.spacing5,
    flex: 1,
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
  },
});
