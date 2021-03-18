import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const PetDetailStyle = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: colors.lightWhite,
    flexDirection: 'row',
    padding: spacings.spacing5,
    marginVertical: spacings.spacing1,
  },
  leftBlock: {
    alignItems: 'center',
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
  sexIcon: {
    height: 18,
    width: 18,
    borderRadius: 18 / 2,
  },
  ageText: {
    marginLeft: spacings.spacing1,
    color: colors.mainGray,
  },
});
