import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';

export const ButtonListStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
  first: {
    marginRight: spacings.spacing1,
  },
  last: {
    marginLeft: spacings.spacing1,
  },
  remain: {
    marginHorizontal: spacings.spacing1,
  },
});
