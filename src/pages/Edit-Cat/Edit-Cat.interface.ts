import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';

type NavProps = StackScreenProps<RootNavParams, 'EditCat'>;

export interface EditCatProps extends NavProps {}
