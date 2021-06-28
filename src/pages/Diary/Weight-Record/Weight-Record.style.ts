import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

export const WeightRecordStyle = StyleSheet.create({
  container: {
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
  chart: {
    marginBottom: spacings.spacing6,
    backgroundColor: colors.lightWhite,
    // backgroundColor: 'blue',
    borderRadius: 8,
    height: 192,
  },
  chartContent: {
    paddingHorizontal: spacings.spacing1,
    paddingTop: spacings.spacing3,
    paddingBottom: 27,
  },
  chartAxisBlock: {
    position: 'absolute',
    height: 132 + spacings.spacing3,
    width: '100%',
  },
  axisContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  axisText: {
    position: 'absolute',
    marginLeft: 6,
  },
  chartAxis: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginLeft: 21,
    width: '100%',
  },
  chartBarContainer: {
    flexDirection: 'row',
    height: 132,
    marginLeft: spacings.spacing6,
  },
  dataBar: {
    position: 'absolute',
    bottom: 0,
  },
  barLabel: {
    marginTop: 8,
    textAlign: 'center',
  },
  chartBar: {
    marginHorizontal: 6,
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
