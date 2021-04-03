import React from 'react';
import { View } from 'react-native';
import { AddCatProgressBar } from '../components/Add-Cat-Progress-Bar/Add-Cat-Progress-Bar';
import { ChoosePhotoStyle } from './Choose-Photo.style';

export const ChoosePhoto: React.FC = props => {
  return (
    <View style={ChoosePhotoStyle.container}>
      <AddCatProgressBar currnetStep={1} totalStep={3} />
    </View>
  );
};
