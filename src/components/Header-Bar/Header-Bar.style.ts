import { StyleSheet } from 'react-native';
import Spacings from 'styles/spacings';

export const HeadBarStyle = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: Spacings.spacing5,
  },
  headerSide: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
  },
});
