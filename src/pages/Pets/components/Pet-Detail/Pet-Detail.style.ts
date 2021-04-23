import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const PetDetailStyle = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: colors.lightWhite,
    padding: spacings.spacing5,
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGray,
    borderRightWidth: 1,
    borderRightColor: colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  content: {
    flexDirection: 'row',
  },
  leftBlock: {
    alignItems: 'center',
  },
  centerBlock: {
    flex: 1,
    paddingLeft: 19,
  },
  catImage: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
  },
  sexAgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacings.spacing7,
    paddingHorizontal: spacings.spacing4,
  },
  ageText: {
    marginLeft: spacings.spacing1,
    color: colors.mainGray,
  },
  detailTextSpacing: {
    marginTop: spacings.spacing1,
  },
  detailBlockSpacing: {
    marginTop: spacings.spacing5,
  },
  tagContainer: {
    marginTop: spacings.spacing5,
    flexDirection: 'row',
  },
  tag: {
    marginRight: spacings.spacing1,
  },
  descriptionContainer: {
    marginTop: spacings.spacing5,
    paddingTop: spacings.spacing5,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
});
