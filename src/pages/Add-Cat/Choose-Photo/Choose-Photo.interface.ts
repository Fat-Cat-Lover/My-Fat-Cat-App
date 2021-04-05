import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';

type NavProps = StackScreenProps<RootNavParams, 'AddCat'>;

export interface ChoosePhotoProps extends NavProps {}
