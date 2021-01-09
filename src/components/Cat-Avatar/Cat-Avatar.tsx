import React from 'react';
import { Image, View } from 'react-native';
import { CatAvatarProps } from './prop.interface';

export const CatAvatar: React.FC<CatAvatarProps> = props => {
  return (
    <View>
      <Image
        source={{
          uri: props.avatar,
        }}
      />
    </View>
  );
};
