import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CatAvatarProps } from './prop.interface';

export const CatAvatar: React.FC<CatAvatarProps> = props => {
  const borderColor = props.selected ? styles.selected : styles.unselected;
  return (
    <View>
      <Image
        source={{
          uri: props.avatar,
        }}
        style={[styles.avatar, borderColor]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 55 / 2,
    borderWidth: 5,
  },
  selected: {
    borderColor: '#FF9F1C',
  },
  unselected: {
    borderColor: '#FFFFFF',
  },
});
