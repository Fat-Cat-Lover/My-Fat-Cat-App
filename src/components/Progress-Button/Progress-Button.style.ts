import { StyleSheet } from 'react-native';
import Colors from 'styles/colors';
import Spacings from 'styles/spacings';

export const ProgressButtonStyle = StyleSheet.create({
  container: {
    height: 189,
    borderRadius: 8,
    backgroundColor: Colors.mainWhite,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacings.spacing6,
    paddingLeft: Spacings.spacing5,
    paddingRight: Spacings.spacing5,
    paddingBottom: Spacings.spacing5,
  },
  progressBarText: {
    marginTop: Spacings.spacing5,
    marginBottom: Spacings.spacing1,
  },
  progressBar: {
    borderRadius: 4,
  },
});
