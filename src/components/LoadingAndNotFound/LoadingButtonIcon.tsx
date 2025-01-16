import React from 'react';
import {ActivityIndicator} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';
import Color from 'styleSheets/lofftColorPallet.json';

const LoadingButtonIcon = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;
  return <ActivityIndicator size="small" color={colors.Black[80]} />;
};

export default LoadingButtonIcon;
