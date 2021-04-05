import React from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { DefaultCatsImages } from 'common/default-cat-images';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcText } from 'components/Text/Text';
import spacings from 'styles/spacings';
import { AddCatProgressBar } from '../components/Add-Cat-Progress-Bar/Add-Cat-Progress-Bar';
import { ChoosePhotoStyle } from './Choose-Photo.style';
import { MfcButton } from 'components/Button/Button';
import { CommonStyle } from 'styles/common-style';
import { RoundImageButton } from 'components/Round-Button/Round-Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { ChoosePhotoProps } from './Choose-Photo.interface';

export const ChoosePhoto: React.FC<ChoosePhotoProps> = props => {
  const [selectedImage, setSelectedImage] = React.useState<number>();
  const [uploadedImage, setUploadedImage] = React.useState<string>();
  const defaultCats = Object.keys(DefaultCatsImages);

  function navBack() {
    props.navigation.pop();
  }

  let imageButton: React.ReactNode;
  if (selectedImage) {
    imageButton = <CatPhotoButton style={ChoosePhotoStyle.uploadButton} size={154} image={selectedImage} />;
  } else if (uploadedImage) {
    imageButton = (
      <View>
        <CatPhotoButton style={ChoosePhotoStyle.uploadButton} size={154} image={{ uri: uploadedImage }} />;
        
      </View>
    );
  } else {
    imageButton = (
      <RoundImageButton style={ChoosePhotoStyle.uploadButton} size={154}>
        <MfcIcon name="perm_media" />
      </RoundImageButton>
    );
  }

  return (
    <View style={ChoosePhotoStyle.container}>
      <AddCatProgressBar currnetStep={1} totalStep={3} />
      <View style={ChoosePhotoStyle.uploadContainer}>
        <MfcHeaderText size="large" type="medium" style={CommonStyle.grayText}>
          點擊上傳貓咪照片
        </MfcHeaderText>
        <MfcText size="large" style={CommonStyle.grayText}>
          或使用預設圖片
        </MfcText>
        {imageButton}
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
                index === 0 ? { paddingLeft: spacings.spacing6 } : undefined,
                index === defaultCats.length - 1 ? { paddingRight: spacings.spacing6 } : undefined,
              ]}>
              <CatPhotoButton
                image={DefaultCatsImages[cat]}
                onPress={() => {
                  setSelectedImage(index);
                }}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={ChoosePhotoStyle.BottomButtonsContainer}>
        <MfcButton color="white" style={ChoosePhotoStyle.BottomButton} onPress={navBack}>
          取消
        </MfcButton>
        <MfcButton style={ChoosePhotoStyle.BottomButton}>繼續</MfcButton>
      </View>
    </View>
  );
};
