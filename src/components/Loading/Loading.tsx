import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Modal, Animated } from 'react-native';
import { LoadingStyle } from './Loading.style';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { useRef } from 'react';

export const Loading: React.FC<{ show: boolean }> = props => {
  const icon1 = useRef(new Animated.Value(0)).current;
  const icon2 = useRef(new Animated.Value(0)).current;
  const icon3 = useRef(new Animated.Value(0)).current;

  function jumpIcon(icon: Animated.Value) {
    return Animated.sequence([
      Animated.timing(icon, { toValue: -30, useNativeDriver: true, duration: 400 }),
      Animated.spring(icon, { toValue: 0, useNativeDriver: true, friction: 4 }),
    ]);
  }

  useEffect(() => {
    Animated.loop(Animated.stagger(300, [jumpIcon(icon1), jumpIcon(icon2), jumpIcon(icon3)])).start();
  });

  return (
    <Modal transparent={true} visible={props.show}>
      <View style={LoadingStyle.container}>
        <View style={LoadingStyle.loadingContainer}>
          <Animated.View style={[LoadingStyle.icon, { transform: [{ translateY: icon1 }] }]}>
            <MfcIcon name="cat" />
          </Animated.View>
          <Animated.View style={[LoadingStyle.icon, { transform: [{ translateY: icon2 }] }]}>
            <MfcIcon name="cat" />
          </Animated.View>
          <Animated.View style={[LoadingStyle.icon, { transform: [{ translateY: icon3 }] }]}>
            <MfcIcon name="cat" />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};
