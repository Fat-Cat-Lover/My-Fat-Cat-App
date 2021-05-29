import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootNavParams } from 'navigations';

type NavProps = BottomTabScreenProps<RootNavParams, 'TabBar'>;

export interface DiaryProps extends NavProps {}
