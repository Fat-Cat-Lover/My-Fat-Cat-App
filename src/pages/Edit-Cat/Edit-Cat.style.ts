import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';

export const EditCatStyle = StyleSheet.create({
  container: {
    padding: spacings.spacing5,
    flex: 1,
  },
  changePhotoBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacings.spacing6,
  },
  changePhotoButton: {
    paddingHorizontal: spacings.spacing6,
    paddingVertical: spacings.spacing3,
  },
  changePhotoButtonContent: {
    flexDirection: 'row',
  },
  changeButtonIcon: {
    marginRight: spacings.spacing3,
  },
  form: {
    marginBottom: spacings.spacing5,
  },
  formField: {
    width: '100%',
    marginBottom: 18,
  },
});
