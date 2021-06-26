import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import { DiaryStackParams } from '../navigation';

type NavigatorProps = CompositeNavigationProp<
  StackNavigationProp<DiaryStackParams, 'WeightRecord'>,
  StackNavigationProp<RootNavParams>
>;

type RouteProps = RouteProp<DiaryStackParams, 'WeightRecord'>;

interface NavProps {
  navigation: NavigatorProps;
  route: RouteProps;
}

export interface WeightRecordProps extends NavProps {}
