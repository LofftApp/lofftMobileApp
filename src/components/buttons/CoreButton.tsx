import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷
import type {CoreButtonProps} from './types';

export const CoreButton = ({
  value,
  icon,
  invert = false,
  style = null,
  textStyle = null,
  textSize = fontStyles.headerSmall,
  onPress,
  disabled = false,
}: CoreButtonProps) => {
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

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Lavendar[100],
    borderColor: Color.Lavendar[100],
    borderRadius: 12,
    paddingVertical: size(10),
    paddingHorizontal: size(16),
    borderWidth: size(2),
    flexDirection: 'row',
    gap: size(7),
    width: '100%',
  },
  buttonTextStyle: {
    color: Color.White[100],
  },
  buttonInvert: {
    backgroundColor: Color.White[100],
  },
  textInvertButton: {
    color: Color.Lavendar[100],
  },
  buttonDisabled: {
    backgroundColor: Color.Black[30],
    borderColor: Color.Black[30],
  },
  textDisabled: {
    color: Color.White[100],
  },
});
