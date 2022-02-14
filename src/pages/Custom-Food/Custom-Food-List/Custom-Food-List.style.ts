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
    backgroundColor: colors.lightWhite,
    borderRadius: 8,
    paddingVertical: 6,
  },
  foodDetailContainer: {
    flex: 1,
    paddingVertical: spacings.spacing5,
    paddingHorizontal: spacings.spacing6,
    justifyContent: 'center',
  },
  dateContainer: {
    paddingHorizontal: spacings.spacing5,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGray,
  },
});
