import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';

export const DiaryStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  diaryContent: {
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
});
