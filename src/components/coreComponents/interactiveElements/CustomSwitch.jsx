import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';

const CustomSwitch = ({value, onValueChange}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: colors.Black[25], true: colors.Lavendar[50]}}
      thumbColor={colors.Lavendar[100]}
    />
  );
};

export default CustomSwitch;
