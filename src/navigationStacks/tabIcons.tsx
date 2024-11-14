import React from 'react';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {RouteProp} from '@react-navigation/native';
import {LessorTabParamsList, TenantTabParamsList} from './types';
type CombinedParams = TenantTabParamsList & LessorTabParamsList;

export const tabIcons = ({
  route,
  color,
}: {
  route: RouteProp<CombinedParams, keyof CombinedParams>;
  color: string;
}) => {
  let iconName = '';
  switch (route.name) {
    case 'searchTab':
      iconName = 'search-sm';
      break;
    case 'applicationTab':
      iconName = 'list';
      break;
    case 'alertsTab':
      iconName = 'bell';
      break;
    case 'userTab':
      iconName = 'user';
      break;
    case 'tempTab':
      iconName = 'user';
      break;
    case 'favoritesTab':
      iconName = 'heart';
      break;
    case 'adminTab':
      iconName = 'gaming-pad';
      break;
    case 'lessorIndex':
      iconName = 'list';
      break;
    case 'lessorAction':
      iconName = 'bell';
      break;
    default:
      iconName = 'settings';
      break;
  }
  return <LofftIcon name={iconName} size={25} color={color} />;
};
