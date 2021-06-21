import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { MfcText } from 'components/Text/Text';
import { ExerciseModalProps } from './Exercise-Modal.interface';
import { Image } from 'react-native';
import { SelectInput } from 'components/Select-Input/Select-Input';
import { useState } from 'react';
import { ExerciseModalStyle } from './Exercise-Modal.style';
import { CommonStyle } from 'styles/common-style';

const options = [10, 15, 20, 25, 30];

export const ExerciseModal: React.FC<ExerciseModalProps> = props => {
  const [exerciseTime, setExerciseTime] = useState<number>(10);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={1}
      animationOutTiming={1}
      isVisible={props.visable}
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}>
      {props.visable ? (
        <View style={ExerciseModalStyle.container}>
          <View style={ExerciseModalStyle.content}>
            <MfcText size="large" style={[ExerciseModalStyle.title, CommonStyle.grayText]}>
              今天運動多久？
            </MfcText>
            <Image source={require('./image/play.png')} style={ExerciseModalStyle.image} />
            <SelectInput
              options={options.map(option => ({ label: `${option} min`, value: option }))}
              onChange={v => {
                if (v) {
                  setExerciseTime(v as number);
                }
              }}
              value={exerciseTime}
              style={ExerciseModalStyle.select}
              placeholder="運動多久？"
            />
          </View>
          <View style={ExerciseModalStyle.buttonContainer}>
            <TouchableOpacity onPress={props.onClose} style={ExerciseModalStyle.button}>
              <MfcText>沒有</MfcText>
            </TouchableOpacity>
            <View style={ExerciseModalStyle.buttonDivider} />
            <TouchableOpacity style={ExerciseModalStyle.button} onPress={() => props.addExerciseTime(exerciseTime)}>
              <MfcText>有運動</MfcText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View />
      )}
    </Modal>
  );
};
