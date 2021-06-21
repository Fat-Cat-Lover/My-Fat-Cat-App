import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const ExerciseModalStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.lightWhite,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: spacings.spacing6,
    paddingTop: spacings.spacing7,
    paddingBottom: 18,
    alignItems: 'center',
  },
  title: {
    marginBottom: spacings.spacing7,
  },
  image: {
    marginBottom: 41,
  },
  select: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    borderTopWidth: 1,
    borderTopColor: colors.darkWhite,
    flex: 1,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDivider: {
    width: 1,
    backgroundColor: colors.darkWhite,
  },
});
