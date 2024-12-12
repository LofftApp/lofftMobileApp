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
    case 'SearchTab':
      iconName = 'search-sm';
      break;
    case 'ApplicationsTab':
      iconName = 'list';
      break;
    case 'NotificationsTab':
      iconName = 'bell';
      break;
    case 'UserTab':
      iconName = 'user';
      break;
    case 'tempTab':
      iconName = 'user';
      break;
    case 'FavoritesTab':
      iconName = 'heart';
      break;
    case 'AdminTab':
      iconName = 'gaming-pad';
      break;
    case 'LessorIndexNavigator':
      iconName = 'list';
      break;
    default:
      iconName = 'settings';
      break;
  }
  return <LofftIcon name={iconName} size={25} color={color} />;
};
