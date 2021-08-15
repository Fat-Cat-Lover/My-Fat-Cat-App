import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';

type NavProps = StackScreenProps<RootNavParams, 'AddEatingRecord'>;

export interface AddEatingRecordProps extends NavProps {}
