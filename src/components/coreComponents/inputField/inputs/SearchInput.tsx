import React from 'react';
import {View, TextInput, Pressable} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import { InputStyleSheet } from './styleSheet';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStyles';

type SearchInputProps = {
  placeholder?: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear: () => void;
  value: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
};
const SearchInput = ({
  placeholder = 'Search',
  onChangeText,
  onFocus,
  onBlur,
  onClear,
  value,
  keyboardType,
}: SearchInputProps) => {

  const {isDarkMode} = useTheme();
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const inputStyleSheet = InputStyleSheet();

  return (
    <View style={inputStyleSheet.inputContainerWithIcon}>
      <View style={inputStyleSheet.textContainer}>
        <LofftIcon name={'search-sm'} size={25} color={colors.Black[50]} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[fontStyles.bodyMedium]}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor={colors.Black[5]}
          keyboardType={keyboardType}
        />
      </View>
      {value ? (
        <Pressable onPress={onClear} style={inputStyleSheet.clearContainer}>
          <LofftIcon name="x-close" size={20} color={colors.Black[50]} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default SearchInput;
