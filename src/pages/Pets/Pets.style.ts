import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';

export const PetsStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  petsDetailContent: {
    flexGrow: 1,
    paddingVertical: spacings.spacing1,
    paddingHorizontal: spacings.spacing5,
  },
});
