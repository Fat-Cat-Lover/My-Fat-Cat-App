import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const OnBoardTemplateStyle = StyleSheet.create({
  container: {
    paddingHorizontal: spacings.spacing6,
    paddingVertical: spacings.spacing7,
    backgroundColor: colors.lightWhite,
    flex: 1,
  },
  title: {
    marginTop: spacings.spacing6,
    marginBottom: 45,
    alignItems: 'center',
  },
});
