import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const EatingRecordFormStyle = StyleSheet.create({
  calcBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  caloryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  caloryInput: {
    width: '55%',
  },
  weight: {
    paddingLeft: spacings.spacing5,
  },
  formField: {
    width: '100%',
    marginBottom: 18,
  },
  exchangeButton: {
    borderWidth: 1,
    borderColor: colors.mainGray,
    padding: 4,
    borderRadius: spacings.spacing1,
  },
});
