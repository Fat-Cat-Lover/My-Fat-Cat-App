import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';
import colors from 'styles/colors';

export const DiaryStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  diaryContainer: {
    marginTop: spacings.spacing3,
    marginBottom: spacings.spacing6,
  },
  diaryContent: {
    flexGrow: 1,
  },
  eatingRecord: {
    paddingVertical: 4,
  },
  noFoodContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFoodText: {
    paddingTop: spacings.spacing3,
  },
  nutritionCotainer: {
    alignItems: 'center',
  },
  nutritionBlock: {
    marginTop: 24,
    width: '97%',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: spacings.spacing5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomButtonContainer: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomButtonSpacing: {
    width: spacings.spacing5,
  },
  bottomButton: {
    flex: 1,
  }
});
