import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷
import type {CoreButtonProps} from './types';
import { useTheme } from 'components/themes/ThemeContext';

export const CoreButton = ({
  value,
  icon,
  invert = false,
  style,
  textStyle,
  textSize ,
  onPress,
  disabled = false,
}: CoreButtonProps) => {

  const {isDarkMode}: any = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;

  const buttonFont = isDarkMode ?  colors.Black[100] : colors.White[100];

  const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Lavendar[100],
    borderColor: colors.Lavendar[100],
    borderRadius: 12,
    paddingVertical: size(10),
    paddingHorizontal: size(16),
    borderWidth: size(2),
    flexDirection: 'row',
    gap: size(7),
    width: '100%',
    height: size(56),
  },
  buttonTextStyle: {
    color: buttonFont,
  },
  buttonInvert: {
    backgroundColor: colors.White[100],
  },
  textInvertButton: {
    color: isDarkMode ? colors.Black[100] : colors.Lavendar[100],
  },
  buttonDisabled: {
    backgroundColor: colors.Black[30],
    borderColor: colors.Black[30],
  },
  textDisabled: {
    color: colors.White[100],
  },
});


  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonStyle,
        invert ? styles.buttonInvert : null,
        disabled ? styles.buttonDisabled : null,
        style,
      ]}
      onPress={onPress}>
      {icon}
      <Text
        style={[
          textSize,
          styles.buttonTextStyle,
          invert ? styles.textInvertButton : null,
          disabled ? styles.textDisabled : null,
          textStyle,
        ]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};
