import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const AddEatingRecordStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacings.spacing5,
  },
  topBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacings.spacing6,
  },
  catImage: {
    borderWidth: 5,
    borderColor: colors.darkOrange,
  },
  addCatFoodButton: {
    paddingHorizontal: spacings.spacing5,
    paddingVertical: spacings.spacing3,
  },
  buttonList: {
    paddingTop: spacings.spacing5,
  },
});
