import { StyleSheet } from 'react-native';
import Colors from 'styles/colors';
import Spacings from 'styles/spacings';

export const CatDiaryStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    height: 89,
    paddingTop: Spacings.spacing3,
    paddingLeft: Spacings.spacing1,
    paddingRight: Spacings.spacing1,
  },
  catButtonContainer: {
    flex: 1,
    marginHorizontal: Spacings.spacing1,
    alignItems: 'center',
  },
  selectedTriangle: {
    top: 6,
  },
  selectedCat: {
    borderColor: Colors.darkOrange,
  },
  DiaryContainer: {
    flex: 1,
    backgroundColor: Colors.lightWhite,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: Spacings.spacing5,
  },
  DiaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DiaryContent: {
  },
});
