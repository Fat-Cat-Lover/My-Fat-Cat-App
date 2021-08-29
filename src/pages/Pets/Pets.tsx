import React from 'react';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { View } from 'react-native';
import { useRootSelector } from 'redux/hooks';
import { PetDetail } from './components/Pet-Detail/Pet-Detail';
import { PetsStyle } from './Pets.style';
import { ScrollView } from 'react-native-gesture-handler';
import { selectCats } from 'redux/cats/selector';
import { MfcButton } from 'components/Button/Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcText } from 'components/Text/Text';
import { CommonStyle } from 'styles/common-style';
import { PetsPageProps } from './Pets.interface';

export const Pets: React.FC<PetsPageProps> = props => {
  function navToDetail(catId: number) {
    props.navigation.navigate('EditCat', { catId });
  }

  const cats = useRootSelector(selectCats);
  return (
    <View style={PetsStyle.container}>
      <HeaderBar>寵物資訊</HeaderBar>
      <ScrollView
        contentContainerStyle={PetsStyle.petsDetailContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {cats.length > 0
          ? cats.map(cat => {
              return (
                <PetDetail
                  cat={cat}
                  key={cat.id}
                  style={PetsStyle.elementVerticalSpacing}
                  editButtonPress={navToDetail}
                />
              );
            })
          : undefined}
        <MfcButton
          style={PetsStyle.elementVerticalSpacing}
          color="gray"
          onPress={() => props.navigation.navigate('AddCat', { screen: 'ChoosePhoto' })}>
          <View style={PetsStyle.addButton}>
            <MfcIcon style={PetsStyle.addButtonIcon} name="add" />
            <MfcText size="large" type="medium" style={CommonStyle.grayText}>
              新增新的貓主子
            </MfcText>
          </View>
        </MfcButton>
      </ScrollView>
    </View>
  );
};
