import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';
import {styles} from './styleSheet';
import {fontStyles} from '../../../../src/styles/fontStyles';
import {SearchIcon} from '../../../assets';

const SearchInputField = ({
  placeholder = 'City, Neighbourhood...',
  onChangeText,
  onFocus = null,
  onBlur = null,
  onClear,
  value,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={[styles.inputFieldStyle, focus ? styles.focus : null]}>
      <SearchIcon></SearchIcon>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputFieldTextStyle, fontStyles.bodyMedium]}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    </View>
  );
};

export default SearchInputField;
