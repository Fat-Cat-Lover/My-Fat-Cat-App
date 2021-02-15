import React from 'react';
import { Image, View } from 'react-native';
import { RoundTriangleStyle } from './Round-Triangle.style';

export const RoundTriangle = () => {
  return (
    <View style={RoundTriangleStyle.container}>
      <Image style={RoundTriangleStyle.triangle} source={require('./round-triangle.png')} />
    </View>
  );
};
