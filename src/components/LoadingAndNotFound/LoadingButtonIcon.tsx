import React from 'react';
import {ActivityIndicator} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';

type LoadingButtonIconProps = {
  size?: 'small' | 'large';
  color?: string;
};
const LoadingButtonIcon = ({
  size = 'small',
  color = Color.Black[80],
}: LoadingButtonIconProps) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default LoadingButtonIcon;
