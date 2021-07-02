import React from 'react';
import { Image } from 'react-native';
import { View } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

const imageStyle = {
  marginHorizontal: spacings.spacing1,
  height: 12,
  width: 12,
};

export const Step: React.FC<{ step: number }> = props => {
  const image = require('assets/images/others/orange-cat.png');
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image source={image} style={imageStyle} />
      <Image source={image} style={[imageStyle, props.step < 2 ? { tintColor: colors.lightOrange } : undefined]} />
      <Image source={image} style={[imageStyle, { tintColor: colors.lightOrange }]} />
    </View>
  );
};
