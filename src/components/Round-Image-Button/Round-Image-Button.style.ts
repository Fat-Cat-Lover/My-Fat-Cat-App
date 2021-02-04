import { StyleSheet } from 'react-native';
import Colors from 'styles/colors';

export const RoundImageButtonStyle = StyleSheet.create({
  contanier: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: Colors.lightWhite,
  },
});
