import { useTheme } from 'components/themes/ThemeContext';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';

const LoadingButtonIcon = () => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  return <ActivityIndicator size="small" color={colors.Black[80]} />;
};

export default LoadingButtonIcon;
