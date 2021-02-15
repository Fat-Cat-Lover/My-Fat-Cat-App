import { StyleSheet } from 'react-native';
import Spacings from 'styles/spacings';

export const HomeStyles = StyleSheet.create({
  diaryContent: {
    paddingTop: Spacings.spacing2,
  },
  dailySummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacings.spacing6,
    paddingBottom: Spacings.spacing6,
  },
  SummarySpacing: {
    height: '100%',
    width: Spacings.spacing5,
  },
});
