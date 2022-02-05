import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import React, { useEffect, useState } from 'react';
import { CustomFoodParams } from '../navigation.params';
import { CustomFoodListStyle } from './Custom-Food-List.style';
import { CustomFood } from 'models/cat-food';
import { getCustomFoodList } from 'services/cat-food';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { MfcText } from 'components/Text/Text';
import dayjs from 'dayjs';

type NavProps = CompositeScreenProps<
  StackScreenProps<CustomFoodParams, 'customFoodList'>,
  StackScreenProps<RootNavParams>
>;

export const CustomFoodList: React.FC<NavProps> = props => {
  const [foods, setFoods] = useState<(CustomFood & { brandName: string })[]>([]);

  useEffect(() => {
    getCustomFoodList().then(_foods => {
      setFoods(_foods);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={CustomFoodListStyle.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {foods.map(food => (
        <TouchableOpacity
          style={CustomFoodListStyle.foodButton}
          onPress={() => props.navigation.navigate('editCustomFood', food)}>
          <View style={CustomFoodListStyle.foodDetailContainer}>
            <MfcText size="normal">
              {food.foodType} - {food.brandName}
            </MfcText>
            <MfcText size="small">{food.name}</MfcText>
          </View>
          <View style={CustomFoodListStyle.dateContainer}>
            <MfcText>{dayjs(food.createdTime).format('MM/DD')}</MfcText>
            <MfcText>新增</MfcText>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
