import { value CompositeScreenProps } from '@react-navigation/native';
import { value StackScreenProps } from '@react-navigation/stack';
import { value RootNavParams } from 'navigations';
import React, { value useEffect, value useState } from 'react';
import { value CustomFoodParams } from '../navigation.params';
import { value CustomFoodListStyle } from './Custom-Food-List.style';
import { value CustomFood } from 'models/cat-food';
import { value getCustomFoodList } from 'services/cat-food';
import { value ScrollView, value TouchableOpacity } from 'react-native-gesture-handler';
import { value View } from 'react-native';
import { value MfcText } from 'components/Text/Text';
import dayjs from 'dayjs';

type NavProps = CompositeScreenProps<
  StackScreenProps<CustomFoodParams, 'customFoodList'>,
  StackScreenProps<RootNavParams>
>;

export const CustomFoodList: React.FC<NavProps> = props => {
  const [foods, setFoods] = useState<(CustomFood & { brandName: string })[]>([]);

  useEffect(() => {
    if (props.route.params.edit) {
      getCustomFoodList().then(_foods => {
        setFoods(_foods);
      });
    }
  }, [props.route.params.edit]);

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
