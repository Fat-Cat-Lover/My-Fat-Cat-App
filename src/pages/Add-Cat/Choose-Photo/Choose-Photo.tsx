import React from 'react';
import { ScrollView, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { DefaultCatsImages } from 'common/default-cat-images';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcText } from 'components/Text/Text';
import spacings from 'styles/spacings';
import { ChoosePhotoStyle } from './Choose-Photo.style';
import { MfcButton } from 'components/Button/Button';
import { CommonStyle } from 'styles/common-style';
import { RoundImageButton } from 'components/Round-Button/Round-Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { ChoosePhotoProps } from './Choose-Photo.interface';
import { SelectedCheckmark } from 'components/Selected-Checkmark/Selected-Checkmark';

export const ChoosePhoto: React.FC<ChoosePhotoProps> = props => {
  const [selectedImage, setSelectedImage] = React.useState<string>();
  const [uploadedImage, setUploadedImage] = React.useState<string>();
  const defaultCats = Object.keys(DefaultCatsImages);

  function navToAddBasicProfile() {
    props.navigation.navigate('AddBasicProfile', {
      photo: uploadedImage,
      useDefault: selectedImage ? selectedImage : undefined,
    });
  }

  function onDefaultCatSelect(catType: string) {
    setSelectedImage(catType);
    setUploadedImage(undefined);
  }

  function onUploadCatPress() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        setSelectedImage(undefined);
        setUploadedImage(image.path);
      })
      .catch(err => {
        if (err.message !== 'User cancelled image selection') {
          throw err;
        }
      });
  }

  let imageButton: React.ReactNode;
  if (selectedImage) {
    imageButton = (
      <CatPhotoButton
        style={ChoosePhotoStyle.uploadButton}
        size={154}
        image={DefaultCatsImages[selectedImage]}
        onPress={onUploadCatPress}
      />
    );
  } else if (uploadedImage) {
    imageButton = (
      <>
        <CatPhotoButton
          style={ChoosePhotoStyle.uploadButton}
          size={154}
          image={{ uri: uploadedImage }}
          onPress={onUploadCatPress}
        />
        <View style={ChoosePhotoStyle.uploadedCheckMark}>
          <SelectedCheckmark size={45} />
        </View>
      </>
    );
  } else {
    imageButton = (
      <RoundImageButton style={ChoosePhotoStyle.uploadButton} size={154} onPress={onUploadCatPress}>
        <MfcIcon name="perm_media" />
      </RoundImageButton>
    );
  }

  return (
    <View style={ChoosePhotoStyle.container}>
      <View style={ChoosePhotoStyle.uploadContainer}>
        <MfcHeaderText size="large" type="medium" style={CommonStyle.grayText}>
          點擊上傳貓咪照片
        </MfcHeaderText>
        <MfcText size="large" style={CommonStyle.grayText}>
          或使用預設圖片
        </MfcText>
        <View style={ChoosePhotoStyle.uploadButtonContainer}>{imageButton}</View>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={ChoosePhotoStyle.catButtonList}
        showsHorizontalScrollIndicator={false}>
        {defaultCats.map((cat, index) => {
          return (
            <View
              key={index}
              style={[
                ChoosePhotoStyle.catButtonContainer,
                index === 0 ? { marginLeft: spacings.spacing6 } : undefined,
                index === defaultCats.length - 1 ? { marginRight: spacings.spacing6 } : undefined,
              ]}>
              <CatPhotoButton image={DefaultCatsImages[cat]} onPress={() => onDefaultCatSelect(cat)} />
              {selectedImage && defaultCats.indexOf(selectedImage) === index ? (
                <SelectedCheckmark style={ChoosePhotoStyle.selectedCheckmark} size={45} />
              ) : undefined}
            </View>
          );
        })}
      </ScrollView>
      <View style={ChoosePhotoStyle.BottomButtonsContainer}>
        <MfcButton color="white" style={ChoosePhotoStyle.BottomButton} onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton
          style={ChoosePhotoStyle.BottomButton}
          onPress={navToAddBasicProfile}
          disabled={!selectedImage && !uploadedImage}>
          繼續
        </MfcButton>
      </View>
    </View>
  );
};
