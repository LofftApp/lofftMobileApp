import React from 'react';
import {ActivityIndicator} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';

const LoadingButtonIcon = () => {
  return <ActivityIndicator size="small" color={Color.Black[80]} />;
};

export default LoadingButtonIcon;
