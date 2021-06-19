import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import { AddEatingRecordNavParams } from 'navigations/Stacks/Add-Eating-Record';

type NavigatorProps = CompositeNavigationProp<
  StackNavigationProp<AddEatingRecordNavParams, 'addEatingRecord'>,
  StackNavigationProp<RootNavParams>
>;

type RouteProps = RouteProp<AddEatingRecordNavParams, 'addEatingRecord'>;

interface NavProps {
  navigation: NavigatorProps;
  route: RouteProps;
}

export interface AddEatingRecordProps extends NavProps {}
