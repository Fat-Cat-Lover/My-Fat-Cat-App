import { StyleSheet } from 'react-native';
import Colors from 'styles/colors';

export const ProgressBarStyle = StyleSheet.create({
  container: {
    height: 4,
    width: '100%',
    backgroundColor: Colors.lightGray,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});
