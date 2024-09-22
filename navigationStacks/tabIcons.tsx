import React from 'react';
import LofftIcon from 'components/lofftIcons/LofftIcon';

export const tabIcons = (route: string, color: string) => {
  let iconName = 'settings';
  switch (route) {
    case 'search':
      iconName = 'search-sm';
      break;
    case 'favorite':
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
