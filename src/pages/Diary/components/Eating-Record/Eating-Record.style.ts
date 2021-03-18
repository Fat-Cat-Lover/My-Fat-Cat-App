import { StyleSheet } from 'react-native';
import spacings from 'styles/spacings';
import colors from 'styles/colors';

export const EatingRecordStyle = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    backgroundColor: colors.mainWhite,
    borderRadius: 8,
  },
  iconBlock: {
    width: 74,
    padding: spacings.spacing3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordBlockContainer: {
    flex: 1,
    paddingVertical: 6,
  },
  recordBlcokContent: {
    paddingHorizontal: spacings.spacing3,
    paddingVertical: spacings.spacing2,
    borderRightWidth: 1,
    borderRightColor: colors.lightGray,
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGray,
  },
  caloryBlock: {
    width: 74,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacings.spacing3,
    paddingVertical: spacings.spacing5,
  },
});
