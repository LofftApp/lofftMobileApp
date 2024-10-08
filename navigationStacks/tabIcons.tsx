import React from 'react';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {RouteProp} from '@react-navigation/native';
import {RootTabParamList} from './types';

export const tabIcons = ({
  route,
  color,
}: {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
  color: string;
}) => {
  let iconName = 'settings';
  switch (route.name) {
    case 'search':
      iconName = 'search-sm';
      break;
    case 'application':
      iconName = 'list';
      break;
    case 'alerts':
      iconName = 'heart';
      break;
    case 'user':
      iconName = 'user';
      break;
    case 'admin':
      iconName = 'gaming-pad';
      break;
  }
  return <LofftIcon name={iconName} size={25} color={color} />;
};
