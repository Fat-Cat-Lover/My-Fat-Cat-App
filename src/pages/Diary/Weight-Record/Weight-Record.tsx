import React, { useCallback } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { selectCats } from 'redux/cats/selector';
import { useRootSelector } from 'redux/hooks';
import { WeightRecordProps } from './Weight-Record.interface';
import { DefaultCatsImages } from 'common/default-cat-images';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcText } from 'components/Text/Text';
import { useState } from 'react';
import { WeightRecordStyle } from './Weight-Record.style';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryZoomContainer, VictoryStack } from 'victory-native';
import colors from 'styles/colors';
import { useEffect } from 'react';
import { addWeightRecord, getWeightRecord } from 'services/diary';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { MfcButton } from 'components/Button/Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';

export const WeightRecord: React.FC<WeightRecordProps> = props => {
  const cats = useRootSelector(selectCats);
  const cat = cats.find(_cat => _cat.id === props.route.params.catId)!;
  const [filter, setFilter] = useState<number>(7);
  const [chartData, setChartData] = useState<{ x: string; y: number }[][]>([]);
  const [newWeight, setNewWeight] = useState<number>();
  // const [maxRange, setMaxRange] = useState<number>();

  let catImage: ImageSourcePropType;
  if (cat.image) {
    catImage = { uri: cat.image };
  } else {
    catImage = DefaultCatsImages[cat.useDefault!];
  }

  const getRecord = useCallback(() => {
    getWeightRecord(cat.id, filter).then(data => {
      const _maxRange = Math.ceil(Math.max(...data.map(_data => _data.weight))) + 1;
      // setMaxRange(_maxRange);
      const chart = [
        data.map(_data => ({
          x: `${_data.createdTime.getMonth() + 1}/${_data.createdTime.getDate()}`,
          y: _data.weight,
        })),
        data.map(_data => ({
          x: `${_data.createdTime.getMonth() + 1}/${_data.createdTime.getDate()}`,
          y: _maxRange - _data.weight,
        })),
      ];
      setChartData(chart);
    });
  }, [cat.id, filter]);

  useEffect(() => {
    getRecord();
  }, [getRecord]);

  return (
    <View style={WeightRecordStyle.container}>
      <View style={WeightRecordStyle.catBlock}>
        <CatPhotoButton size={55} image={catImage} style={WeightRecordStyle.catImage} />
        <MfcHeaderText size="large">{cat.name}</MfcHeaderText>
      </View>
      <View style={WeightRecordStyle.filterBlock}>
        <MfcText size="large">體重變化表（kg/時間）</MfcText>
        <MfcButton
          color="white"
          style={WeightRecordStyle.filterButton}
          onPress={() => {
            filter === 7 ? setFilter(12) : setFilter(7);
          }}>
          <View style={WeightRecordStyle.filterContentContainer}>
            <MfcText style={WeightRecordStyle.filterText}>近{filter}筆</MfcText>
            <MfcIcon name="transfer" />
          </View>
        </MfcButton>
      </View>
      <View style={WeightRecordStyle.chartBlock}>
        <VictoryChart
          padding={{ top: 20, bottom: 50, left: 40, right: 50 }}
          domainPadding={20}
          height={196}
          containerComponent={<VictoryZoomContainer allowZoom={false} zoomDimension={'x'} />}
          style={{
            parent: { backgroundColor: colors.lightWhite, borderRadius: 8 },
          }}>
          <Defs>
            <LinearGradient id="orangeGradient" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0" stopColor={colors.mainOrange} />
              <Stop offset="1" stopColor={colors.darkOrange} />
            </LinearGradient>
            <LinearGradient id="grayGradient" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0%" stopColor={colors.lightWhite} stopOpacity="0.5" />
              <Stop offset="34.35%" stopColor={colors.mainWhite} stopOpacity="0.5" />
            </LinearGradient>
          </Defs>
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: 'transparent' },
              grid: { stroke: colors.lightGray, strokeWidth: 1 },
            }}
          />
          <VictoryAxis style={{ axis: { stroke: 'transparent' } }} />
          <VictoryStack>
            <VictoryBar data={chartData[0]} style={{ data: { fill: 'url(#orangeGradient)' } }} barWidth={32} />
            <VictoryBar data={chartData[1]} style={{ data: { fill: 'url(#grayGradient)' } }} barWidth={32} />
          </VictoryStack>
        </VictoryChart>
      </View>
      <View style={WeightRecordStyle.newWeightBlock}>
        <MfcTextInput
          label="更新目前體重"
          keyboardType="numeric"
          containerStyle={WeightRecordStyle.newWeightInput}
          value={newWeight ? newWeight.toString() : ''}
          onChange={v => (v ? setNewWeight(parseFloat(v)) : setNewWeight(undefined))}
        />
        <MfcButton
          disabled={!newWeight}
          style={WeightRecordStyle.newWeightButton}
          onPress={async () => {
            if (newWeight) {
              await addWeightRecord(cat.id, new Date(), newWeight);
              getRecord();
            }
          }}
          color="black">
          確定更新
        </MfcButton>
      </View>
    </View>
  );
};
