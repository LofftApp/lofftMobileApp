import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {fontStyles} from 'styleSheets/fontStyles';
import {inputStyles} from './inputStylesheet';
import {size} from 'react-native-responsive-sizes';

type SearchInputProps = {
  placeholder?: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  onClear: () => void;
  value: string;
  style?: StyleProp<ViewStyle>;
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
  onClear,
  value,
  keyboardType,
  errorMessage,
  style,
}: SearchInputProps) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <View style={style}>
      <View
        style={[
          styles.searchIconContainer,
          inputStyles.input,
          inputStyles.paddingLeft,
          focus && inputStyles.focus,
          !!errorMessage && inputStyles.errorActive,
        ]}>
        <LofftIcon name={'search-sm'} size={25} color={Color.Black[50]} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[fontStyles.bodyMedium]}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          keyboardType={keyboardType}
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

const styles = StyleSheet.create({
  searchIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    gap: size(5),
  },
  clearContainer: {
    position: 'absolute',
    top: size(8),
    right: size(10),
    padding: size(5),
    backgroundColor: Color.White[100],
  },
});

export default SearchInput;
