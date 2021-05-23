import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavParams } from 'navigations';
import { AddCatNavParams } from 'navigations/Stacks/Add-Cat';

type NavigatorProps = CompositeNavigationProp<
  StackNavigationProp<AddCatNavParams, 'ChoosePhoto'>,
  StackNavigationProp<RootNavParams>
>;

type RouteProps = RouteProp<AddCatNavParams, 'ChoosePhoto'>;

interface NavProps {
  navigation: NavigatorProps;
  route: RouteProps;
}

export interface ChoosePhotoProps extends NavProps {}
