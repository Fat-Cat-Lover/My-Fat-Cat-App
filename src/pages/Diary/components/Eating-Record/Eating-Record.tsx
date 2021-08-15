import dayjs from 'dayjs';
import React from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';
import { MfcText } from 'components/Text/Text';
import { EatingRecordProps } from './Eating-Record.interface';
import { EatingRecordStyle } from './Eating-Record.style';
import { CommonStyle } from 'styles/common-style';

const eatingRecordIcon = {
  morning: require('assets/images/eating-record-icon/morning.png'),
  afternoon: require('assets/images/eating-record-icon/afternoon.png'),
  night: require('assets/images/eating-record-icon/night.png'),
};

export const EatingRecord: React.FC<EatingRecordProps> = props => {
  const recordTime = dayjs(props.record.createdTime);
  const currentHour = recordTime.hour();
  let icon: ImageSourcePropType;
  if (currentHour >= 6 && currentHour < 12) {
    icon = eatingRecordIcon.morning;
  } else if (currentHour >= 12 && currentHour < 18) {
    icon = eatingRecordIcon.afternoon;
  } else {
    icon = eatingRecordIcon.night;
  }

  return (
    <View style={EatingRecordStyle.container}>
      <View style={EatingRecordStyle.iconBlock}>
        <Image source={icon} />
        <MfcText size="small" style={CommonStyle.grayText}>
          {recordTime.format('HH:mm')}
        </MfcText>
      </View>
      <View style={EatingRecordStyle.recordBlockContainer}>
        <View style={EatingRecordStyle.recordBlcokContent}>
          <MfcText size="normal" style={CommonStyle.grayText}>
            {props.record.foodType}
          </MfcText>
          <MfcText size="small" style={CommonStyle.grayText}>
            {props.record.brand} {props.record.foodName}
          </MfcText>
        </View>
      </View>
      <View style={EatingRecordStyle.caloryBlock}>
        <MfcText size="normal" type="medium">
          {props.record.calories}
        </MfcText>
        <MfcText size="normal" type="regular">
          Cal
        </MfcText>
      </View>
    </View>
  );
};
