import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import { EatingRecordParams } from '../navigation';

type NavigatorProps = CompositeNavigationProp<
  StackNavigationProp<EatingRecordParams, 'AddEatingRecord'>,
  StackNavigationProp<RootNavParams>
>;

type RouteProps = RouteProp<EatingRecordParams, 'AddEatingRecord'>;

interface NavProps {
  navigation: NavigatorProps;
  route: RouteProps;
}

export interface AddEatingRecordProps extends NavProps {}
