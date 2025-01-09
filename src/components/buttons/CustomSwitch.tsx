import { useTheme } from 'components/themes/ThemeContext';
import React from 'react';
import {Switch} from 'react-native';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';



const CustomSwitch = ({value, onValueChange}: any) => {
  const {isDarkMode} = useTheme();
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
