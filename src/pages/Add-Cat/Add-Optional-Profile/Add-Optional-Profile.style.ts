import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';

export const AddOptionalProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacings.spacing5,
    paddingTop: spacings.spacing7,
    paddingBottom: spacings.spacing5,
  },
  formContent: {
    alignItems: 'center',
  },
  formField: {
    width: '100%',
    marginBottom: 18,
  },
  checkBoxContainer: {
    flexDirection: 'row',
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
