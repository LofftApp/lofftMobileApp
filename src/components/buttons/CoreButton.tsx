import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

export const CoreButton = ({
  value,
  invert = false,
  style = null,
  textStyle = null,
  onPress,
  disabled = false,
}: any) => {
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
      <Text
        style={[
          fontStyles.headerSmall,
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
    height: 53,
    borderWidth: 2,
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
    backgroundColor: Color.White[100],
    borderColor: Color.Black[30],
  },
  textDisabled: {
    color: Color.Black[30],
  },
});