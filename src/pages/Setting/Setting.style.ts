import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const SettingStyle = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginVertical: spacings.spacing1,
  },
  buttonContentContainer: {
    flexDirection: 'row',
  },
  infoContent: {
    padding: spacings.spacing3,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
  },
  icon: {
    marginLeft: spacings.spacing3,
  },
});
