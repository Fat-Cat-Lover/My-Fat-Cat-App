import React from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { RoundImageButton } from 'components/Round-Button/Round-Button';
import { CatDiaryProps } from './Cat-Diary-Panel.interface';
import { CatDiaryStyle } from './Cat-Diary-style';
import { DefaultCatsImages } from 'common/default-cat-images';
import { RoundTriangle } from 'components/Cat-Diary-Panel/components/Round-Triangle/Round-Triangle';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { useRootDispatch, useRootSelector } from 'redux/hooks';
import { setSelectedCat } from 'redux/cats/slice';

export const CatDiary: React.FC<CatDiaryProps> = props => {
  const selectedCat = useRootSelector(state => state.cats.selectedCat);
  const dispatch = useRootDispatch();

  function selectCat(index: number) {
    dispatch(setSelectedCat(index));
    if (props.onCatSelect) {
      props.onCatSelect(index);
    }
  }

  return (
    <View style={CatDiaryStyle.container}>
      <View style={CatDiaryStyle.listContainer}>
        <ScrollView horizontal={true}>
          {props.cats.map((cat, index) => {
            let image: ImageSourcePropType;
            if (cat.image) {
              image = { uri: cat.image };
            } else {
              image = DefaultCatsImages[cat.useDefault!];
            }
            const isSelected = selectedCat === index;
            return (
              <View style={CatDiaryStyle.catButtonContainer} key={cat.id}>
                <CatPhotoButton
                  size={55}
                  image={image}
                  onPress={() => selectCat(index)}
                  style={[isSelected && CatDiaryStyle.selectedCat]}
                />
                {isSelected && (
                  <View style={CatDiaryStyle.selectedTriangle}>
                    <RoundTriangle />
                  </View>
                )}
              </View>
            );
          })}
          <RoundImageButton size={55} style={CatDiaryStyle.catButtonContainer} onPress={props.addButtonOnPress}>
            <MfcIcon name="add" />
          </RoundImageButton>
        </ScrollView>
      </View>
      <View style={CatDiaryStyle.DiaryContainer}>
        {props.cats.length > 0 && (
          <>
            <View style={CatDiaryStyle.DiaryHeader}>
              <MfcHeaderText size="large">{props.cats[selectedCat]?.name}</MfcHeaderText>
              <View style={CatDiaryStyle.HeaderRight}>{props.DiaryHeaderRight}</View>
            </View>
            <View style={CatDiaryStyle.DiaryContent}>{props.children}</View>
          </>
        )}
      </View>
    </View>
  );
};
