import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Components 🪢
import PasswordInput from './inputs/PasswordInput';
import SearchInput from './inputs/SearchInput';
import CurrencyInput from './inputs/CurrencyInput';
import DefaultInput from './inputs/DefaultInput';

// Style 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Types 🏷️
import type {InputFieldTextProps} from './types';

const InputFieldText = ({
  placeholder = null,
  type = null,
  onChangeText,
  value,
  onClear = () => {},
  errorMessage = '',
  keyboardType = 'default',
  dropdown = false,
  dropDownContent = [],
  dropDownPressAction = () => {},
  style,
  onFocus = () => {},
}: InputFieldTextProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <View
        style={[
          styles.inputFieldStyle,
          dropdown &&
            value.length > 0 &&
            dropDownContent.length > 0 &&
            styles.inputDropDown,
          focus && styles.focus,
          !!errorMessage && styles.errorActive,
          style,
        ]}>
        {type === 'password' ? (
          <PasswordInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            value={value}
            placeholder={placeholder || 'Password Field'}
            autoCapitalize="none"
            keyboardType={keyboardType}
          />
        ) : type === 'search' ? (
          <SearchInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onClear={onClear}
            value={value}
            placeholder={placeholder || 'Search Field'}
            keyboardType={keyboardType}
            dropdown={dropdown}
          />
        ) : type === 'currency' ? (
          <CurrencyInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onClear={onClear}
            value={value}
            placeholder={placeholder || 'Currency Field'}
            keyboardType={keyboardType}
            dropdown={dropdown}
          />
        ) : (
          <DefaultInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={onFocus || (() => setFocus(true))}
            value={value}
            placeholder={placeholder || 'Default Field'}
            autoCapitalize={type === 'email' ? 'none' : 'sentences'}
            keyboardType={keyboardType}
            dropdown={dropdown}
          />
        )}
      </View>
      {dropdown && value.length > 0 && (
        <View style={dropDownContent.length > 0 ? styles.dropDown : null}>
          {dropDownContent.map((val, i) => {
            return (
              <Pressable onPress={() => dropDownPressAction(val)} key={i}>
                <Text
                  style={[
                    fontStyles.bodyMedium,
                    styles.dropDownItem,
                    i % 2 !== 0 && styles.oddPlaceList,
                  ]}>
                  {val}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Black[50],
    paddingHorizontal: size(4),
    height: size(48),
    justifyContent: 'center',
  },
  focus: {
    borderColor: Color.Lavendar[100],
  },
  inputDropDown: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  dropDown: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderTopColor: Color.Lavendar[30],
    borderColor: Color.Lavendar[100],
    borderBottomLeftRadius: size(16),
    borderBottomRightRadius: size(16),
    minHeight: size(48),
    justifyContent: 'center',
  },
  dropDownItem: {
    marginVertical: size(2),
    borderBottomWidth: size(3),
    paddingVertical: size(6),
    paddingHorizontal: size(8),
    borderBottomColor: Color.Black[100],
  },
  oddPlaceList: {
    backgroundColor: Color.Black[10],
  },

  errorActive: {
    borderColor: Color.Tomato[100],
  },
});

export default InputFieldText;
