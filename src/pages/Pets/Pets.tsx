import React from 'react';
import { HeaderBar } from 'components/Header-Bar/Header-Bar';
import { View } from 'react-native';
import { useRootSelector } from 'redux/hooks';
import { PetDetail } from './components/Pet-Detail/Pet-Detail';
import { PetsStyle } from './Pets.style';

export const Pets: React.FC = props => {
  const cats = useRootSelector(state => state.cats.cats);

  return (
    <View style={PetsStyle.container}>
      <HeaderBar>寵物資訊</HeaderBar>
      <View style={PetsStyle.petsDetailContainer}>
        {cats.length > 0
          ? cats.map(cat => {
              return <PetDetail cat={cat} key={cat.id} />;
            })
          : undefined}
      </View>
    </View>
  );
};
