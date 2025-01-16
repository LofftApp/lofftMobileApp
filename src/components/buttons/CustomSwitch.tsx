import React from 'react';
import {Switch} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

const CustomSwitch = ({value, onValueChange}: any) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: colors.Lavendar[30], true: colors.Lavendar[50]}}
      thumbColor={colors.Lavendar[100]}
    />
  );
};

export default CustomSwitch;
