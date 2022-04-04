import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import React, { useEffect, useState } from 'react';
import { CustomFoodListStyle } from './Custom-Food-List.style';
import { CustomFood } from 'models/cat-food';
import { getCustomFoodList } from 'services/cat-food';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { MfcText } from 'components/Text/Text';
import dayjs from 'dayjs';
import { CommonStyle } from 'styles/common-style';
import { SettingStackParams } from 'pages/Setting/navigation.params';

type NavProps = CompositeScreenProps<
  StackScreenProps<SettingStackParams, 'customFoodList'>,
  StackScreenProps<RootNavParams>
>;

export const CustomFoodList: React.FC<NavProps> = props => {
  const [foods, setFoods] = useState<(CustomFood & { brandName: string })[]>();

  useEffect(() => {
    if (props.route.params && props.route.params.edit) {
      getCustomFoodList().then(_foods => {
        setFoods(_foods);
      });
    }
  }, [props.route.params]);

  useEffect(() => {
    getCustomFoodList().then(_foods => {
      setFoods(_foods);
    });
  }, []);

  return (
    <>
      {foods ? (
        foods.length > 0 ? (
          <ScrollView
            contentContainerStyle={CustomFoodListStyle.container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {foods.map(food => (
              <TouchableOpacity
                style={CustomFoodListStyle.foodButton}
                onPress={() => props.navigation.navigate('CustomFood', { screen: 'editCustomFood', params: food })}
                key={food.id}>
                <View style={CustomFoodListStyle.foodDetailContainer}>
                  <MfcText size="large" style={CommonStyle.grayText}>
                    {food.foodType} - {food.brandName}
                  </MfcText>
                  <MfcText style={CommonStyle.grayText}>{food.name}</MfcText>
                </View>
                <View style={CustomFoodListStyle.dateContainer}>
                  <MfcText size="large" type="medium">
                    {dayjs(food.createdTime).format('MM/DD')}
                  </MfcText>
                  <MfcText size="large">新增</MfcText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MfcText>目前沒有任何自定義食物喔</MfcText>
          </View>
        )
      ) : undefined}
    </>
  );
};
