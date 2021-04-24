import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const AddBasicProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacings.spacing5,
    paddingTop: spacings.spacing7,
    paddingBottom: spacings.spacing5,
  },
  title: {
    marginVertical: spacings.spacing6,
  },
  formContent: {
    alignItems: 'center',
  },
  formField: {
    width: '100%',
    marginBottom: 18,
  },
  buttonContainer: {
    marginTop: spacings.spacing5,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  buttonSpace: {
    width: spacings.spacing5,
  },
});
