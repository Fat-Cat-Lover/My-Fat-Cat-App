import { Dimensions, StyleSheet } from 'react-native';

export const DatePickerStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  datePicker: {
    width: Dimensions.get('window').width * 0.4,
  },
});
