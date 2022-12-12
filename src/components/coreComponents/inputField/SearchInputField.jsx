import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';
import PasswordInput from './inputs/PasswordInput';
import SearchInput from './inputs/SearchInput';
import DefaultInput from './inputs/DefaultInput';
import {styles} from './styleSheet';

const SearchInputField = ({
  placeholder = null,
  type = null,
  onChangeText,
  value,
  onClear = null,
  keyboardType = 'default',
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={[styles.inputFieldStyle, focus ? styles.focus : null]}></View>
  );
};

export default SearchInputField;
