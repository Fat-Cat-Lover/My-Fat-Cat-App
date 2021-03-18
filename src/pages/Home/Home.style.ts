import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';
import Spacings from 'styles/spacings';

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  diaryContent: {
    paddingTop: Spacings.spacing2,
  },
  weightTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightContent: {
    paddingLeft: spacings.spacing1,
    flexDirection: 'row',
  },
  weightArrow: {
    marginHorizontal: 12.11,
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
