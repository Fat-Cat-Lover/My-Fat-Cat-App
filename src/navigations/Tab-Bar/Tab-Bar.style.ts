import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export const TabBarStyle = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: colors.lightWhite,
  },
  tabBarButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor: {
    color: colors.lightGray,
  },
  iconColor: {
    tintColor: colors.lightGray, 
  },
  focusedText: {
    color: colors.darkOrange,
  },
  focusedIcon: {
    tintColor: colors.darkOrange,
  },
  focusedMark: {
    position: 'absolute',
  }
});
