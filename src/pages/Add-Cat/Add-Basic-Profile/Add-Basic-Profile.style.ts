import { StyleSheet } from 'react-native';
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
  },
});
