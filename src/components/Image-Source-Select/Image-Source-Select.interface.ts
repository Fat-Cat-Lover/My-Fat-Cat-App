import { ImageOrVideo } from 'react-native-image-crop-picker';

export interface ImageSourceSelectProps {
  visable: boolean;
  onImageSelect: (image: ImageOrVideo) => void;
  onClose: () => void;
}
