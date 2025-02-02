import React from 'react';
import {ActivityIndicator} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';

const LoadingButtonIcon = ({size = 'small'}: {size: 'small' | 'large'}) => {
  return <ActivityIndicator size={size} color={Color.Black[80]} />;
};

export default LoadingButtonIcon;
