import React from 'react';
import {Switch} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import { useTheme } from 'components/themes/ThemeContext';

const CustomSwitch = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: () => void;
}) => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: colors.Black[30], true: colors.Lavendar[30]}}
      thumbColor={value ? colors.Lavendar[100] : colors.Black[50]}
    />
  );
};

export default CustomSwitch;
