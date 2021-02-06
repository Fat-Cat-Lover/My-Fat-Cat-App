import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface RoundImageButtonProps {
  image: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  onPress?: () => any;
}
