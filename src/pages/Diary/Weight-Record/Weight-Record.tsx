import React, { useCallback } from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { selectCats } from 'redux/cats/selector';
import { useRootSelector } from 'redux/hooks';
import { WeightRecordProps } from './Weight-Record.interface';
import { DefaultCatsImages } from 'common/default-cat-images';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { MfcHeaderText } from 'components/Header-Text/Header-Text';
import { MfcText } from 'components/Text/Text';
import { useState } from 'react';
import { WeightRecordStyle } from './Weight-Record.style';
import colors from 'styles/colors';
import { useEffect } from 'react';
import { addWeightRecord, getWeightRecord } from 'services/diary';
import { Defs, LinearGradient, Stop, Svg, Rect } from 'react-native-svg';
import { MfcButton } from 'components/Button/Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';

export const WeightRecord: React.FC<WeightRecordProps> = props => {
  const cats = useRootSelector(selectCats);
  const cat = cats.find(_cat => _cat.id === props.route.params.catId)!;
  const [filter, setFilter] = useState<number>(7);
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  const [newWeight, setNewWeight] = useState<string>();
  const [axisRange, setAxisRange] = useState<number[]>();

  let catImage: ImageSourcePropType;
  if (cat.image) {
    catImage = { uri: cat.image };
  } else {
    catImage = DefaultCatsImages[cat.useDefault!];
  }

  const getRecord = useCallback(() => {
    getWeightRecord(cat.id, filter).then(data => {
      const maxRange = Math.ceil(Math.max(...data.map(_data => _data.weight)));
      const minRange = Math.floor(Math.min(...data.map(_data => _data.weight))) - 1;
      setAxisRange([
        minRange,
        minRange + parseFloat(((maxRange - minRange) * (1 / 3)).toFixed(1)),
        minRange + parseFloat(((maxRange - minRange) * (2 / 3)).toFixed(1)),
        maxRange,
      ]);
      const chart = data.map(_data => ({
        x: `${_data.createdTime.getMonth() + 1}/${_data.createdTime.getDate()}`,
        y: _data.weight,
      }));
      setChartData(chart);
    });
  }, [cat.id, filter]);

  useEffect(() => {
    getRecord();
  }, [getRecord]);

  const renderDataChart = (data: { x: string; y: number }, range: number[]) => {
    const height = (132 * (data.y - range[0])) / (range[range.length - 1] - range[0]);
    return (
      <View>
        <View style={WeightRecordStyle.dataBar}>
          <Svg width={32} height={height}>
            <Defs>
              <LinearGradient id="orangeGradient" x1="0" x2="0" y1="0" y2="1">
                <Stop offset="0" stopColor={colors.mainOrange} />
                <Stop offset="1" stopColor={colors.darkOrange} />
              </LinearGradient>
            </Defs>
            <Rect width={32} height={height} fill="url(#orangeGradient)" />
          </Svg>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={WeightRecordStyle.container} showsVerticalScrollIndicator={false}>
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
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={WeightRecordStyle.chart}
        contentContainerStyle={WeightRecordStyle.chartContent}>
        <View style={WeightRecordStyle.chartAxisBlock}>
          {axisRange
            ? axisRange
                // .slice()
                // .reverse()
                .map((r, i) => (
                  <View style={[WeightRecordStyle.axisContainer, { bottom: ((i * 1) / 3) * 132 }]} key={r}>
                    <MfcText size="small" style={WeightRecordStyle.axisText}>
                      {r}
                    </MfcText>
                    <View style={WeightRecordStyle.chartAxis} />
                  </View>
                ))
            : undefined}
        </View>
        <View style={WeightRecordStyle.chartBarContainer}>
          {Array.from(Array(filter).keys()).map((_, i) => (
            <View style={WeightRecordStyle.chartBar} key={i}>
              <>
                <Svg width={32} height={132}>
                  <Defs>
                    <LinearGradient id="grayGradient" x1="0" x2="0" y1="0" y2="1">
                      <Stop offset="0%" stopColor={colors.lightWhite} stopOpacity="0.6" />
                      <Stop offset="34.35%" stopColor={colors.mainWhite} stopOpacity="0.6" />
                    </LinearGradient>
                  </Defs>
                  <Rect width={32} height={132} fill="url(#grayGradient)" />
                </Svg>
              </>
              {chartData[i] && axisRange ? renderDataChart(chartData[i], axisRange) : undefined}
              {chartData[i] ? <MfcText style={WeightRecordStyle.barLabel}>{chartData[i].x}</MfcText> : undefined}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={WeightRecordStyle.newWeightBlock}>
        <MfcTextInput
          label="更新目前體重"
          keyboardType="numeric"
          containerStyle={WeightRecordStyle.newWeightInput}
          value={newWeight}
          onChange={v => setNewWeight(v)}
          errorMessage={newWeight && !/^\d+(\.\d+)?$/.test(newWeight) ? '請填數字' : ''}
        />
        <MfcButton
          disabled={!newWeight || !parseFloat(newWeight)}
          style={WeightRecordStyle.newWeightButton}
          onPress={async () => {
            if (newWeight) {
              await addWeightRecord(cat.id, new Date(), parseFloat(newWeight));
              getRecord();
            }
          }}
          color="black">
          確定更新
        </MfcButton>
      </View>
    </ScrollView>
  );
};
