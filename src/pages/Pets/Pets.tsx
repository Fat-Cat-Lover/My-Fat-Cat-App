import React from 'react';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { View } from 'react-native';
import { useRootSelector } from 'redux/hooks';
import { PetDetail } from './components/Pet-Detail/Pet-Detail';
import { PetsStyle } from './Pets.style';
import { ScrollView } from 'react-native-gesture-handler';
import { selectCats } from 'redux/cats/selector';
import { MfcButton } from 'components/Button/Button';
import { CommonStyle } from 'styles/common-style';
import { PetsPageProps } from './Pets.interface';
import { Cat } from 'models/cat';

export const Pets: React.FC<PetsPageProps> = props => {
  function navToDetail(cat: Cat) {
    props.navigation.navigate('EditCat', { cat });
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
          iconName="add"
          textStyle={CommonStyle.grayText}
          onPress={() => props.navigation.navigate('AddCat', { screen: 'ChoosePhoto' })}>
          新增新的貓主子
        </MfcButton>
      </ScrollView>
    </View>
  );
};
