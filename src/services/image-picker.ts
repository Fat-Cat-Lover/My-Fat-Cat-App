import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

export function openImagePicker(): Promise<ImageOrVideo | undefined> {
  return ImagePicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
    cropperCircleOverlay: true,
  }).catch(err => {
    if (err.message !== 'User cancelled image selection') {
      throw err;
    } else {
      return undefined;
    }
  });
}
