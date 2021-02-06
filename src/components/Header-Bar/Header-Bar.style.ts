import { StyleSheet } from 'react-native';

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
    padding: 16,
    flex: 1,
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
  },
});
