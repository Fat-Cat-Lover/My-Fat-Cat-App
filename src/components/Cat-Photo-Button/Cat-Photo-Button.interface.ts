import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

export interface CatPhotoButtonProps {
  image: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ImageStyle>;
  onPress?: () => any;
  disabled?: boolean;
}
