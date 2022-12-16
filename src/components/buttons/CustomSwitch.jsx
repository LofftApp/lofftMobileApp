import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import color from '../../styles/lofftColorPallet.json';

const CustomSwitch = ({value, onValueChange}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: color.Lavendar[25], true: color.Lavendar[50]}}
      thumbColor={color.Lavendar[100]}
    />
  );
};

export default CustomSwitch;
