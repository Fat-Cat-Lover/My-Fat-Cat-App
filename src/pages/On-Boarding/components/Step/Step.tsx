import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import React from 'react';
import { View } from 'react-native';
import colors from 'styles/colors';
import spacings from 'styles/spacings';

const imageStyle = {
  marginHorizontal: spacings.spacing1,
  height: 12,
  width: 12,
};

export const Step: React.FC<{ step: number }> = props => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <MfcIcon name="cat" style={imageStyle} />
      <MfcIcon
        name="cat"
        style={[imageStyle, props.step < 2 ? { tintColor: colors.lightOrange } : { tintColor: colors.darkOrange }]}
      />
      <MfcIcon name="cat" style={[imageStyle, { tintColor: colors.lightOrange }]} />
    </View>
  );
};
