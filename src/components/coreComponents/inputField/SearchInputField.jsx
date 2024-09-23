import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {styles} from './styleSheet';
import {fontStyles} from '../../../../src/styles/fontStyles';
import {SearchIcon} from '../../../assets';

const SearchInputField = ({
  placeholder = 'City, Neighbourhood...',
  onChangeText,
  onFocus = null,
  value,
}) => {
  const [focus] = useState(false);
  return (
    <View style={[styles.inputFieldStyle, focus ? styles.focus : null]}>
      <SearchIcon />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={fontStyles.bodyMedium}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    </View>
  );
};

export default SearchInputField;
