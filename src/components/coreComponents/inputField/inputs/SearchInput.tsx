import React from 'react';
import {View, TextInput, Pressable} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {fontStyles} from 'styleSheets/fontStyles';
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
    <View style={styles.inputContainerWithIcon}>
      <View style={styles.textContainer}>
        <LofftIcon name={'search-sm'} size={25} color={Color.Black[50]} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[fontStyles.bodyMedium]}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
        />
      </View>
      {value ? (
        <Pressable onPress={onClear} style={styles.clearContainer}>
          <LofftIcon name="x-close" size={20} color={Color.Black[50]} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default SearchInput;
