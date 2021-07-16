import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, View, ScrollView } from 'react-native';
import { unwrapResult } from '@reduxjs/toolkit';
import { Image } from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';

import { ButtonList } from 'components/Button-List/Button-List';
import { InputLabel } from 'components/Input-Label/Input-Label';
import { MfcTextArea } from 'components/Text-Area/Mfc-Text-Area';
import { MfcTextInput } from 'components/Text-Input/Mfc-Text-Input';
import { Checkbox } from 'components/Checkbox/Checkbox';
import { DateInput } from 'components/Date-Input/Date-Input';

import { EditCatStyle } from './Edit-Cat.style';
import { CatPhotoButton } from 'components/Cat-Photo-Button/Cat-Photo-Button';
import { EditCatProps } from './Edit-Cat.interface';
import { RootState } from 'redux/store';
import { DefaultCatsImages } from 'common/default-cat-images';
import { Cat } from 'models/cat';
import { MfcButton } from 'components/Button/Button';
import { MfcIcon } from 'components/MFC-Icon/MFC-Icon';
import { MfcText } from 'components/Text/Text';
import { CommonStyle } from 'styles/common-style';
import { useRootDispatch } from 'redux/hooks';
import { editCat } from 'redux/cats/slice';
import { ImageSourceSelect } from 'components/Image-Source-Select/Image-Source-Select';
import { plainToClass } from 'class-transformer';

interface EditCatForm {
  name: string;
  description: string;
  isNeuter: boolean;
  targetWeight: number;
  active: 'active' | 'normal' | 'nonactive';
  latestHealthCheckDate?: string;
}

export const EditCatPage: React.FC<EditCatProps> = props => {
  const catId = props.route.params.catId;
  const cat = useSelector<RootState, Cat>(state => plainToClass(Cat, state.cats.cats.find(_cat => _cat.id === catId)!));
  const [newImage, setNewImage] = useState<Image | undefined>(undefined);
  const [showSelect, toggleShowSelect] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<EditCatForm>();
  const dispacth = useRootDispatch();

  let catImage: ImageSourcePropType;
  if (newImage) {
    catImage = { uri: newImage.path };
  } else {
    if (cat.image) {
      catImage = { uri: cat.image };
    } else {
      catImage = DefaultCatsImages[cat.useDefault ? cat.useDefault : 'orange'];
    }
  }

  async function onSubmit(newCat: EditCatForm) {
    try {
      const result = await dispacth(
        editCat({
          id: cat.id,
          age: cat.age,
          name: newCat.name,
          image: newImage,
          description: newCat.description,
          isNeuter: newCat.isNeuter,
          targetWeight: newCat.targetWeight,
          active: newCat.active,
          latestHealthCheckDate: newCat.latestHealthCheckDate,
        })
      );
      unwrapResult(result);
      props.navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={EditCatStyle.container}>
      <ImageSourceSelect
        visable={showSelect}
        onImageSelect={image => setNewImage(image)}
        onClose={() => toggleShowSelect(false)}
      />
      <ScrollView style={EditCatStyle.form}>
        <View style={EditCatStyle.changePhotoBlock}>
          <CatPhotoButton size={55} image={catImage} />
          <MfcButton color="gray" style={EditCatStyle.changePhotoButton} onPress={() => toggleShowSelect(true)}>
            <View style={EditCatStyle.changePhotoButtonContent}>
              <MfcIcon style={EditCatStyle.changeButtonIcon} name="perm_media" />
              <MfcText type="medium" size="large" style={CommonStyle.grayText}>
                更改照片
              </MfcText>
            </View>
          </MfcButton>
        </View>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <MfcTextInput
              label="寵物名稱"
              placeholder="16 字內的寵物名稱"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              required={true}
              containerStyle={EditCatStyle.formField}
              errorMessage={fieldState.error && fieldState.error.message}
            />
          )}
          defaultValue={cat.name}
        />
        <Controller
          name="targetWeight"
          control={control}
          render={({ field, fieldState }) => (
            <MfcTextInput
              label="目標公斤數(kg)"
              placeholder="希望可以達到的目標體重幾公斤"
              value={field.value ? field.value.toString() : ''}
              onChange={v => field.onChange(parseFloat(v))}
              onBlur={field.onBlur}
              required={true}
              containerStyle={EditCatStyle.formField}
              errorMessage={fieldState.error && fieldState.error.message}
              keyboardType="number-pad"
            />
          )}
          defaultValue={cat.targetWeight}
        />
        <Controller
          name="isNeuter"
          control={control}
          render={({ field }) => (
            <View style={EditCatStyle.formField}>
              <InputLabel label="寵物結紮" required={true} />
              <ButtonList>
                <Checkbox value="沒結紮" onChange={() => field.onChange(false)} checked={field.value === false} />
                <Checkbox value="已經結紮" onChange={() => field.onChange(true)} checked={field.value} />
              </ButtonList>
            </View>
          )}
          defaultValue={cat.isNeuter}
        />
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <View style={EditCatStyle.formField}>
              <InputLabel label="好動程度" required={true} />
              <ButtonList>
                <Checkbox value="好動" onChange={() => field.onChange('active')} checked={field.value === 'active'} />
                <Checkbox value="普通" onChange={() => field.onChange('normal')} checked={field.value === 'normal'} />
                <Checkbox
                  value="不太動"
                  onChange={() => field.onChange('nonactive')}
                  checked={field.value === 'nonactive'}
                />
              </ButtonList>
            </View>
          )}
          defaultValue={cat.active}
        />
        <Controller
          name="latestHealthCheckDate"
          control={control}
          render={({ field }) => (
            <View style={EditCatStyle.formField}>
              <DateInput
                label="上一次體檢日期（非必填）"
                onChange={newDate => field.onChange(newDate.toISOString())}
                value={field.value}
                placeholder="點我選日期"
              />
            </View>
          )}
          defaultValue={cat.latestHealthCheck}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <MfcTextArea
              label="關於貓咪的介紹（非必填）"
              onChange={field.onChange}
              value={field.value}
              placeholder="說點什麼你家貓貓的好話吧"
              containerStyle={EditCatStyle.formField}
            />
          )}
          defaultValue={cat.description}
        />
      </ScrollView>
      <ButtonList>
        <MfcButton color="white" onPress={props.navigation.goBack}>
          取消
        </MfcButton>
        <MfcButton color="primary" onPress={handleSubmit(onSubmit)}>
          完成
        </MfcButton>
      </ButtonList>
    </View>
  );
};
