import { ImageSourcePropType } from 'react-native';

export interface CatPhotoButtonProps {
  image: ImageSourcePropType | keyof typeof catImages;
  size: number;
  borderWidth?: number;
  onPress?: () => any;
}

export const catImages: { [key: string]: ImageSourcePropType } = {
  orange: require('./images/orange.png'),
  white: require('./images/white.png'),
  black: require('./images/black.png'),
  gray: require('./images/gray.png'),
  orangeWhite: require('./images/orange-white.png'),
  blackWhite: require('./images/black-white.png'),
  orangeTiger: require('./images/orange-tiger.png'),
  brownTiger: require('./images/brownTiger.png'),
  grayTiger: require('./images/gray-tiger.png'),
  threeColors: require('./images/three-colors.png'),
};
