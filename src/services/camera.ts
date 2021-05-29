import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

export function openCamera(): Promise<ImageOrVideo | undefined> {
  return ImagePicker.openCamera({
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
