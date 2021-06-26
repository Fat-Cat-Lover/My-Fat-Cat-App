import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const WeightRecordStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacings.spacing5,
  },
  catBlock: {
    flexDirection: 'row',
    paddingVertical: spacings.spacing3,
    alignItems: 'center',
  },
  catImage: {
    borderColor: colors.mainOrange,
    marginRight: spacings.spacing6,
  },
  filterButton: {
    padding: spacings.spacing1,
    borderColor: colors.lightGray,
    borderWidth: 1,
  },
  filterContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginRight: spacings.spacing4,
  },
  filterBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacings.spacing3,
    paddingBottom: spacings.spacing5,
  },
  chartBlock: {
    marginBottom: spacings.spacing6,
  },
  newWeightBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newWeightInput: {
    flex: 4,
  },
  newWeightButton: {
    marginTop: 28,
    marginLeft: 10,
    paddingVertical: 10,
    flex: 3,
    height: 54,
  },
});
