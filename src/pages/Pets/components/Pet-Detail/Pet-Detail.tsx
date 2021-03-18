import React from 'react';
import { DefaultCatsImages } from 'common/default-cat-images';
import { MfcText } from 'components/Text/Text';
import { SexIcon } from 'components/Sex-Icon/Sex-Icon';
import { Image, ImageSourcePropType, View } from 'react-native';
import { PetDetailProps } from './Pet-Detail.interface';
import { PetDetailStyle } from './Pet-Detail.style';

export const PetDetail: React.FC<PetDetailProps> = props => {
  const cat = props.cat;
  let imageSource: ImageSourcePropType;
  if (cat.image) {
    imageSource = { uri: cat.image };
  } else {
    imageSource = DefaultCatsImages[cat.useDefault!];
  }
  return (
    <View style={PetDetailStyle.container}>
      <View style={PetDetailStyle.leftBlock}>
        <Image style={PetDetailStyle.catImage} source={imageSource} />
        <View style={PetDetailStyle.sexAgeContainer}>
          <SexIcon sex={cat.sex} style={PetDetailStyle.sexIcon} />
          <MfcText style={PetDetailStyle.ageText}>{cat.age}</MfcText>
        </View>
      </View>
    </View>
  );
};
