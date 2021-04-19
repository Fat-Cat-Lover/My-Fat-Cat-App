import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';

export const BaseInputStyle = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  label: {
    marginVertical: spacings.spacing1,
  },
});
