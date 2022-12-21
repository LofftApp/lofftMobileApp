import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';
import {CrossIcon} from '../../../assets';

const CheckBox = ({disabled = false, value = true, style = null, onPress}) => {
  return (
    <View
      style={[styles.CBContainer, style, disabled ? styles.disabled : null]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.xIconContainer]}>
        {disabled ? null : value ? <CrossIcon /> : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CBContainer: {
    width: 24,
    height: 24,
    borderColor: colors.Lavendar[100],
    borderWidth: 3,
    borderRadius: 4,
  },
  xIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xIcon: {
    fontSize: 30,
  },
  disabled: {
    borderColor: colors.Black[50],
    backgroundColor: colors.Black[10],
  },
});

export default CheckBox;
