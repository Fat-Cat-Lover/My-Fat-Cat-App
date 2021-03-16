import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';
import colors from 'styles/colors';

export const DiaryStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  diaryContent: {
    flex: 1,
    paddingTop: spacings.spacing3,
  },
  eatingRecord: {
    paddingVertical: 4,
  },
  noFoodCatContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFoodText: {
    paddingTop: spacings.spacing3,
  },
  nutritionBlock: {
    top: 24,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: spacings.spacing5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
