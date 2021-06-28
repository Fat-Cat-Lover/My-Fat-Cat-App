import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import { DiaryStackParams } from '../navigation';

type NavigatorProps = CompositeNavigationProp<
  StackNavigationProp<DiaryStackParams, 'Diary'>,
  StackNavigationProp<RootNavParams>
>;

type RouteProps = RouteProp<DiaryStackParams, 'Diary'>;

interface NavProps {
  navigation: NavigatorProps;
  route: RouteProps;
}


export interface DiaryProps extends NavProps {}
