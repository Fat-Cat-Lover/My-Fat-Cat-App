import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface CatPhotoButtonProps {
  image: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => any;
}
