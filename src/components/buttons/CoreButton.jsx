import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

// Assets 🖼
import color from '../../styles/lofftColorPallet.json';
// StyleSheets 🖌
import {fontStyles} from '../../styles/fontStyles';

export const CoreButton = ({
  value,
  invert = false,
  style = null,
  textStyle = null,
  onPress,
  disabled = false,
}) => {
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
    backgroundColor: color.Lavendar[100],
    borderColor: color.Lavendar[100],
    borderRadius: 12,
    height: 53,
    borderWidth: 2,
  },
  buttonTextStyle: {
    color: color.White[100],
  },
  buttonInvert: {
    backgroundColor: color.White[100],
  },
  textInvertButton: {
    color: color.Lavendar[100],
  },
  buttonDisabled: {
    backgroundColor: color.White[100],
    borderColor: color.Black[30],
  },
  textDisabled: {
    color: color.Black[30],
  },
});
