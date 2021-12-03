import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const OnBoardingStyle = StyleSheet.create({
  container: {
    paddingHorizontal: spacings.spacing6,
    paddingVertical: spacings.spacing7,
    backgroundColor: colors.lightWhite,
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: spacings.spacing6,
    marginBottom: 45,
    alignItems: 'center',
  },
  stepBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextButton: {
    width: '50%',
  },
  finishButton: {
    width: '100%',
  },
});
