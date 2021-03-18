import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export const SexIconStyle = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: '53%',
    width: '53%',
    tintColor: colors.lightWhite,
  },
  male: {
    backgroundColor: '#73DAF0',
  },
  female: {
    backgroundColor: '#FDCCCF',
  },
});
