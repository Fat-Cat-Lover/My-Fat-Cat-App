import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const ChoosePhotoStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  uploadContainer: {
    paddingTop: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  uploadButtonContainer: {
    marginTop: spacings.spacing7,
    marginBottom: 82,
  },
  uploadButton: {
    borderWidth: 5,
    borderColor: colors.lightGray,
    backgroundColor: colors.lightWhite,
  },
  uploadedCheckMark: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  catButtonList: {
    alignSelf: 'flex-end',
    paddingVertical: spacings.spacing1,
  },
  catButtonContainer: {
    marginHorizontal: spacings.spacing1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckmark: {
    position: 'absolute',
  },
  BottomButtonsContainer: {
    flexDirection: 'row',
    paddingVertical: spacings.spacing5,
    paddingHorizontal: spacings.spacing1,
  },
  BottomButton: {
    flex: 1,
    marginHorizontal: spacings.spacing1,
  },
});
