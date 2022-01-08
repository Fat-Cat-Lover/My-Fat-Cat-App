// import { plainToClass } from 'class-transformer';
// import { DefaultCatsImages } from 'common/default-cat-images';
// import { ButtonList } from 'components/Button-List/Button-List';
// import { MfcButton } from 'components/Button/Button';
// import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
// import { DateInput } from 'components/Date-Input/Date-Input';
// import { InputLabel } from 'components/Input-Label/Input-Label';
// import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
// import { SelectInput } from 'components/Select-Input/Select-Input';
// import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
// import { MfcText } from 'components/Text/Text';
// import { TimeInput } from 'components/Time-Input/Time-Input';
// import { CatFood, FoodType } from 'models/cat-food';
// import { Diary } from 'models/diary';
// import React, { useEffect, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { ImageSourcePropType, ScrollView, View } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { showAlert } from 'redux/alert/slice';
// import { selectCats } from 'redux/cats/selector';
// import { editEatingRecord, deleteEatingRecord as deleteRecord } from 'redux/diary/slice';
// import { useRootDispatch, useRootSelector } from 'redux/hooks';
// import { requestEnd, requestStart } from 'redux/loading/slice';
// import {
//   getFoodTypes,
//   getBrands as getBrandsFromApi,
//   getCatFoods as getCatFoodsFromApi,
//   getCustomBrands,
//   getCustomFoods,
// } from 'services/cat-food';
// import { getDiary } from 'services/diary';
// import { CommonStyle } from 'styles/common-style';
// import { EditEatingRecordProps } from './Edit-Eating-Record.interface';
// import { EditEatingRecordStyle } from './Edit-Eating-Record.style';

// interface EditEatingRecordForm {
//   foodType: number;
//   brand: string | null;
//   catFood: number | null;
// }

// export const EditEatingRecordPage: React.FC<EditEatingRecordProps> = props => {
//   const cats = useRootSelector(selectCats);
//   const record = useRootSelector(state =>
//     state.diary.currentDiary?.records.find(r => r.id === props.route.params.recordId)
//   )!;
//   const cat = cats.find(_cat => _cat.id === props.route.params.catId)!;
//   const {
//     control,
//     getValues,
//     watch,
//     setValue,
//     formState: { isValid },
//     handleSubmit,
//   } = useForm<EditEatingRecordForm>({ mode: 'onChange' });

//   const [dateTime, setDateTime] = useState<Date>(new Date(record.createdTime));
//   const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
//   const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
//   const [catFoods, setCatFoods] = useState<CatFood[]>([]);
//   const [remainCalories, setRemainCalories] = useState<string>(props.route.params.remainCalories!.toFixed(2));
//   const [calcType, setCalcType] = useState<'calroies' | 'weight'>('calroies');
//   const [eatingCalories, setCalories] = useState<number>(record.calories);
//   const [eatingWeight, setWeight] = useState<number>(record.weight);

//   const dispatch = useRootDispatch();

//   useEffect(() => {
//     if (record.foodId.startsWith('c'))
//   }, [dispatch]);

//   let catImage: ImageSourcePropType;
//   if (cat.image) {
//     catImage = { uri: cat.image };
//   } else {
//     catImage = DefaultCatsImages[cat.useDefault!];
//   }

//   async function getBrands(foodTypeId: number) {
//     const foodType = foodTypes.find(t => t.id === foodTypeId)!;
//     const [_brands, customBrands] = await Promise.all([
//       getBrandsFromApi(foodTypeId),
//       getCustomBrands(foodType.food_type),
//     ]);
//     setBrands([
//       ..._brands.map(b => ({ id: b.id.toString(), name: b.name })),
//       ...customBrands.map(b => ({ id: `自訂${b.id}`, name: `${b.name} [自訂]` })),
//     ]);
//   }

//   async function getCatFoods(brandId: string) {
//     const foodTypeId = getValues('foodType');
//     let _catFoods: CatFood[];
//     if (brandId.startsWith('自訂')) {
//       const foodType = foodTypes.find(t => t.id === foodTypeId)!;
//       _catFoods = await getCustomFoods(foodType.food_type, parseInt(brandId.substr(2), 10));
//     } else {
//       _catFoods = await getCatFoodsFromApi(foodTypeId, parseInt(brandId, 10));
//     }
//     if (_catFoods.length < 1) {
//       dispatch(
//         showAlert({
//           message: '此品牌目前沒有該類別的食物喔',
//           buttons: [{ text: '好的' }],
//         })
//       );
//     }
//     setCatFoods(_catFoods);
//   }

//   function resetCalcValue() {
//     setCalories(0);
//     setWeight(0);
//   }

//   function onCaloriesChange(calories: number) {
//     if (calories) {
//       const catFoodId = getValues('catFood');
//       if (catFoodId) {
//         const catFood = catFoods.find(_catFood => _catFood.id === catFoodId);
//         setCalories(calories);
//         setWeight(parseFloat(((calories / catFood!.calories) * 100).toFixed(1)));
//         return;
//       }
//     }
//     setCalories(0);
//     setWeight(0);
//   }

//   function onWeightChange(weight: number) {
//     if (weight) {
//       const catFoodId = getValues('catFood');
//       if (catFoodId) {
//         const catFood = catFoods.find(_catFood => _catFood.id === catFoodId);
//         setWeight(0);
//         setCalories(parseFloat((weight * (catFood!.calories / 100)).toFixed(1)));
//         return;
//       }
//     }
//     setWeight(0);
//     setCalories(0);
//   }

//   async function onSubmit(data: EditEatingRecordForm) {
//     const foodType = foodTypes.find(type => type.id === data.foodType)!;
//     const brand = brands.find(_brand => _brand.id === data.brand)!;
//     const food = catFoods.find(_food => _food.id === data.catFood)!;
//     await dispatch(
//       editEatingRecord({
//         recordId: record.id,
//         time: dateTime,
//         foodType: foodType.food_type,
//         brand: brand.name,
//         food,
//         weight: eatingWeight,
//       })
//     );
//     props.navigation.goBack();
//   }

//   async function deleteEatingRecord() {
//     dispatch(
//       showAlert({
//         message: '你確定要刪除此筆資訊嗎？',
//         buttons: [
//           {
//             text: '否',
//           },
//           {
//             text: '是',
//             onClick: async () => {
//               props.navigation.goBack();
//               await dispatch(deleteRecord(record.id));
//             },
//           },
//         ],
//       })
//     );
//   }

//   return (
//     <View style={EditEatingRecordStyle.container}>
//       <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
//         <View style={EditEatingRecordStyle.topBlock}>
//           <CatPhotoButton size={55} image={catImage} style={EditEatingRecordStyle.catImage} />
//         </View>
//         <DateInput
//           label="日期"
//           value={dateTime}
//           onChange={async date => {
//             setDateTime(
//               new Date(date.getFullYear(), date.getMonth(), date.getDate(), dateTime.getHours(), dateTime.getMinutes())
//             );
//             const diary = plainToClass(Diary, await getDiary(cat.id, date));
//             setRemainCalories((cat.dailyCalories - diary.caloriesEatenToday).toFixed(2));
//           }}
//           style={EditEatingRecordStyle.formField}
//         />
//         <TimeInput
//           label="時間"
//           value={dateTime}
//           onChange={time =>
//             setDateTime(
//               new Date(
//                 dateTime.getUTCFullYear(),
//                 dateTime.getMonth(),
//                 dateTime.getDate(),
//                 time.getHours(),
//                 time.getMinutes()
//               )
//             )
//           }
//           style={EditEatingRecordStyle.formField}
//         />
//         <Controller
//           name="foodType"
//           control={control}
//           render={({ field }) => (
//             <SelectInput
//               label="種類"
//               options={foodTypes.map(type => ({ label: type.food_type, value: type.id }))}
//               onChange={value => {
//                 if (value && field.value !== value) {
//                   field.onChange(value);
//                   getBrands(value as number);
//                   if (getValues('brand')) {
//                     setValue('brand', null);
//                     setValue('catFood', null);
//                     resetCalcValue();
//                   }
//                 }
//               }}
//               value={field.value}
//               placeholder="選擇種類"
//               style={EditEatingRecordStyle.formField}
//               icon="expandMore"
//             />
//           )}
//           rules={{ required: true }}
//           defaultValue={foodTypes.find(foodType => foodType.food_type === record.foodType)?.id}
//         />
//         <Controller
//           name="brand"
//           control={control}
//           render={({ field }) => (
//             <SelectInput
//               label="品牌"
//               options={brands.map(brand => ({ label: brand.name, value: brand.id }))}
//               onChange={value => {
//                 if (value && field.value !== value) {
//                   field.onChange(value);
//                   getCatFoods(value as string);
//                   if (getValues('catFood')) {
//                     setValue('catFood', null);
//                     resetCalcValue();
//                   }
//                 }
//               }}
//               icon="expandMore"
//               value={field.value}
//               placeholder="選擇品牌"
//               style={EditEatingRecordStyle.formField}
//             />
//           )}
//           rules={{ required: true }}
//           defaultValue={brands.find(brand => brand.name === record.brand)?.id}
//         />
//         <Controller
//           name="catFood"
//           control={control}
//           render={({ field }) => (
//             <SelectInput
//               label="食物內容"
//               options={catFoods.map(catFood => ({ label: catFood.name, value: catFood.id }))}
//               onChange={value => {
//                 if (value && field.value !== value) {
//                   resetCalcValue();
//                   field.onChange(value);
//                 }
//               }}
//               value={field.value}
//               placeholder="選擇食物"
//               style={EditEatingRecordStyle.formField}
//               icon="expandMore"
//             />
//           )}
//           rules={{ required: true }}
//           defaultValue={catFoods.find(catFood => catFood.name === record.foodName)?.id}
//         />
//         {calcType === 'calroies' ? (
//           <>
//             <InputLabel label="卡路里" />
//             <View style={EditEatingRecordStyle.calcBlock}>
//               <View style={EditEatingRecordStyle.caloryContainer}>
//                 <MfcTextInput
//                   keyboardType="number-pad"
//                   value={eatingCalories ? eatingCalories.toString() : ''}
//                   onChange={value => onCaloriesChange(parseInt(value, 10))}
//                   containerStyle={EditEatingRecordStyle.caloryInput}
//                   disabled={!watch('catFood')}
//                 />
//                 <View style={EditEatingRecordStyle.weight}>
//                   <MfcText size="large" type="medium">
//                     = {eatingWeight} g
//                   </MfcText>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => setCalcType('weight')} style={EditEatingRecordStyle.exchangeButton}>
//                 <MfcIcon name="transfer" />
//               </TouchableOpacity>
//             </View>
//             <MfcText style={[EditEatingRecordStyle.formField, CommonStyle.grayText]}>
//               今日尚未進食: {remainCalories} cal
//             </MfcText>
//           </>
//         ) : (
//           <>
//             <InputLabel label="重量" />
//             <View style={EditEatingRecordStyle.calcBlock}>
//               <View style={EditEatingRecordStyle.caloryContainer}>
//                 <MfcTextInput
//                   keyboardType="number-pad"
//                   value={eatingWeight ? eatingWeight.toString() : ''}
//                   onChange={value => onWeightChange(parseInt(value, 10))}
//                   containerStyle={EditEatingRecordStyle.caloryInput}
//                   disabled={!watch('catFood')}
//                 />
//                 <View style={EditEatingRecordStyle.weight}>
//                   <MfcText size="large" type="medium">
//                     = {eatingCalories} cal
//                   </MfcText>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => setCalcType('calroies')} style={EditEatingRecordStyle.exchangeButton}>
//                 <MfcIcon name="transfer" />
//               </TouchableOpacity>
//             </View>

//             <MfcText style={[EditEatingRecordStyle.formField, CommonStyle.grayText]}>
//               今日尚未進食: {remainCalories} cal
//             </MfcText>
//           </>
//         )}
//         <MfcButton iconName="cancel" color="gray" textStyle={CommonStyle.grayText} onPress={deleteEatingRecord}>
//           刪除此筆餵食資訊
//         </MfcButton>
//       </ScrollView>
//       <ButtonList>
//         <MfcButton color="white" onPress={props.navigation.goBack}>
//           取消
//         </MfcButton>
//         <MfcButton color="primary" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
//           確定修改
//         </MfcButton>
//       </ButtonList>
//     </View>
//   );
// };
