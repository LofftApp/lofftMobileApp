import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontStyles} from '../../../../styles/fontStyles';
import {styles} from './styleSheet';
const SearchInput = ({
  placeholder = 'Search',
  onChangeText,
  onFocus = null,
  onBlur = null,
  onClear,
  value,
}: any) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={'search-outline'} size={20} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputFieldTextStyle, fontStyles.bodyMedium]}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      {value ? (
        <TouchableOpacity onPress={onClear}>
          <Icon name={'close-outline'} size={20} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchInput;
