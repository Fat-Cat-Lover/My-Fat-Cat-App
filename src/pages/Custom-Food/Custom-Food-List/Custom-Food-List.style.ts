import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const CustomFoodListStyle = StyleSheet.create({
  container: {
    paddingHorizontal: spacings.spacing5,
    paddingVertical: spacings.spacing6,
  },
  foodButton: {
    flexDirection: 'row',
    marginBottom: spacings.spacing5,
  },
  foodDetailContainer: {
    paddingVertical: spacings.spacing5,
    paddingHorizontal: spacings.spacing6,
    justifyContent: 'center',
  },
  dateContainer: {
    paddingHorizontal: spacings.spacing3,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGray,
  },
});
