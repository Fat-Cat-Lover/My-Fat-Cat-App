import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { ImageSourceSelectProps } from './Image-Source-Select.interface';
import { ImageSourceSelectStyle } from './Image-Source-Select.style';
import { MfcText } from 'components/Text/Text';
import { openImagePicker } from 'services/image-picker';
import { openCamera } from 'services/camera';
import { ImageOrVideo } from 'react-native-image-crop-picker';

export const ImageSourceSelect: React.FC<ImageSourceSelectProps> = props => {
  async function getImage(source: 'camera' | 'album') {
    props.onClose();
    let image: ImageOrVideo | undefined;
    if (source === 'camera') {
      image = await openCamera();
    } else {
      image = await openImagePicker();
    }
    if (image) {
      props.onImageSelect(image);
    }
  }

  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={1}
      animationOutTiming={1}
      isVisible={props.visable}
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}>
      <View style={ImageSourceSelectStyle.container}>
        <View style={ImageSourceSelectStyle.modal}>
          <TouchableOpacity style={ImageSourceSelectStyle.option} onPress={() => getImage('camera')}>
            <MfcText size="large">拍照</MfcText>
          </TouchableOpacity>
          <TouchableOpacity style={ImageSourceSelectStyle.option} onPress={() => getImage('album')}>
            <MfcText size="large">從相簿選擇</MfcText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
