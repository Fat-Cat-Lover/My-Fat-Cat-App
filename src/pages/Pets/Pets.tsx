import React from 'react';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { View } from 'react-native';
import { useRootSelector } from 'redux/hooks';
import { PetDetail } from './components/Pet-Detail/Pet-Detail';
import { PetsStyle } from './Pets.style';
import { ScrollView } from 'react-native-gesture-handler';
import { selectCats } from 'redux/cats/selector';

export const Pets: React.FC = props => {
  const cats = useRootSelector(selectCats);

  return (
    <View style={PetsStyle.container}>
      <HeaderBar>寵物資訊</HeaderBar>
      <ScrollView contentContainerStyle={PetsStyle.petsDetailContent}>
        {cats.length > 0
          ? cats.map(cat => {
              return <PetDetail cat={cat} key={cat.id} />;
            })
          : undefined}
      </ScrollView>
    </View>
  );
};
