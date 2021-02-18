import React from 'react';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { RoundImageButton } from 'components/Round-Button/Round-Button';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { CatDiaryProps } from './Cat-Diary-Panel.interface';
import { CatDiaryStyle } from './Cat-Diary-style';
import { DefaultCatsImages } from 'common/default-cat-images';
import { RoundTriangle } from 'components/Round-Triangle/Round-Triangle';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';

export class CatDiary extends React.Component<CatDiaryProps, { selectedCatIndex: number }> {
  constructor(props: CatDiaryProps) {
    super(props);
    this.state = {
      selectedCatIndex: 0,
    };
  }

  selectCat(index: number) {
    this.setState({
      selectedCatIndex: index,
    });
    if (this.props.onCatSelect) {
      this.props.onCatSelect(index);
    }
  }

  render() {
    return (
      <View style={CatDiaryStyle.container}>
        <View style={CatDiaryStyle.listContainer}>
          <ScrollView horizontal={true}>
            {this.props.cats.map((cat, index) => {
              let image: ImageSourcePropType;
              if (cat.image) {
                image = { uri: cat.image };
              } else {
                image = DefaultCatsImages[cat.useDefault ? cat.useDefault : 'orange'];
              }
              const isSelected = this.state.selectedCatIndex === index;
              return (
                <View style={CatDiaryStyle.catButtonContainer} key={cat.id}>
                  <CatPhotoButton
                    size={55}
                    image={image}
                    onPress={() => this.selectCat(index)}
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
            <RoundImageButton size={55}>
              <MfcIcon name="add" />
            </RoundImageButton>
          </ScrollView>
        </View>
        <View style={CatDiaryStyle.DiaryContainer}>
          <View style={CatDiaryStyle.DiaryHeader}>
            <MfcHeaderText size="large">{this.props.cats[this.state.selectedCatIndex]?.name}</MfcHeaderText>
            {this.props.DiaryHeaderLeft}
          </View>
          <ScrollView style={CatDiaryStyle.DiaryContent}>{this.props.children}</ScrollView>
        </View>
      </View>
    );
  }
}
