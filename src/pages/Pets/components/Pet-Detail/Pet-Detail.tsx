import React from 'react';
import { DefaultCatsImages } from 'common/default-cat-images';
import { MfcText } from 'components/Text/Text';
import { SexIcon } from 'components/Sex-Icon/Sex-Icon';
import { Image, ImageSourcePropType, View } from 'react-native';
import { PetDetailProps } from './Pet-Detail.interface';
import { PetDetailStyle } from './Pet-Detail.style';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import dayjs from 'dayjs';
import { PetTag } from '../Pet-Tag/Pet-Tag';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { CommonStyle } from 'styles/common-style';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const PetDetail: React.FC<PetDetailProps> = props => {
  const cat = props.cat;
  let imageSource: ImageSourcePropType;
  if (cat.image) {
    imageSource = { uri: cat.image };
  } else {
    imageSource = DefaultCatsImages[cat.useDefault!];
  }

  let activeTag: string;
  if (cat.active === 'active') {
    activeTag = '活動量大';
  } else if (cat.active === 'nonactive') {
    activeTag = '活動量低';
  } else {
    activeTag = '活動量普通';
  }
  return (
    <View style={[PetDetailStyle.container, props.style]}>
      <View style={PetDetailStyle.content}>
        <View style={PetDetailStyle.leftBlock}>
          <Image style={PetDetailStyle.catImage} source={imageSource} />
          <View style={PetDetailStyle.sexAgeContainer}>
            <SexIcon size={18} sex={cat.sex} />
            <MfcText style={PetDetailStyle.ageText}>{cat.age}</MfcText>
          </View>
        </View>
        <View style={PetDetailStyle.centerBlock}>
          <MfcHeaderText size="small">{cat.name}</MfcHeaderText>
          <MfcText style={[PetDetailStyle.detailTextSpacing, CommonStyle.grayText]} type="medium">
            目標：{cat.targetWeight} kg
          </MfcText>
          <MfcText style={[PetDetailStyle.detailTextSpacing, CommonStyle.grayText]}>
            現在：{cat.currentWeight} kg
          </MfcText>
          <MfcText style={[PetDetailStyle.detailBlockSpacing, CommonStyle.grayText]}>
            每日可吃熱量：{cat.dailyCalories} cal
          </MfcText>
          <MfcText style={[PetDetailStyle.detailTextSpacing, CommonStyle.grayText]}>
            上次健檢：{cat.latestHealthCheck ? dayjs(cat.latestHealthCheck).format('YYYY/MM/DD') : '–'}
          </MfcText>
          <View style={PetDetailStyle.tagContainer}>
            <PetTag style={PetDetailStyle.tag} tag={cat.isNeuter ? '已結紮' : '未結紮'} />
            <PetTag style={PetDetailStyle.tag} tag={activeTag} />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => props.editButtonPress && props.editButtonPress(cat.id)}>
            <MfcIcon name="create" />
          </TouchableOpacity>
        </View>
      </View>
      {cat.description ? (
        <View style={PetDetailStyle.descriptionContainer}>
          <MfcText size="small" style={CommonStyle.grayText}>
            {cat.description}
          </MfcText>
        </View>
      ) : undefined}
    </View>
  );
};
