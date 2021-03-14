import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';

export const DiaryStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  diaryContent: {
    paddingTop: spacings.spacing5,
  },
  noFoodCatContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
