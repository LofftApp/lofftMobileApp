import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Animated} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Components 🪢
import PasswordInput from './inputs/PasswordInput';
import SearchInput from './inputs/SearchInput';
import CurrencyInput from './inputs/CurrencyInput';
import DefaultInput from './inputs/DefaultInput';

// Style 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷️
import type {InputFieldTextProps} from './types';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';

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
  currency = 'eur',
}: InputFieldTextProps) => {
  const [focus, setFocus] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {isDarkMode}: any = useTheme();
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;


  useEffect(() => {
    if (dropdown && dropDownContent.length > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [dropdown, dropDownContent, fadeAnim]);

  const styles = StyleSheet.create({
  inputFieldStyle: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.Black[50],
    paddingHorizontal: size(4),
    height: size(48),
    justifyContent: 'center',
  },
  focus: {
    borderColor: colors.Lavendar[100],
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
    borderTopColor: colors.Lavendar[100],
    borderColor: colors.Lavendar[100],
    borderBottomLeftRadius: size(16),
    borderBottomRightRadius: size(16),
    minHeight: size(48),
    justifyContent: 'center',
  },
  dropDownItem: {
    marginVertical: 2,
    borderBottomWidth: 3,
    paddingVertical: size(6),
    paddingHorizontal: size(8),
    borderBottomColor: colors.Black[100],
  },
  oddPlaceList: {},

  errorActive: {
    borderColor: colors.Tomato[100],
  },
});

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
          />
        ) : type === 'currency' ? (
          <CurrencyInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            value={value}
            placeholder={placeholder || 'Currency Field'}
            keyboardType={keyboardType}
            currency={currency}
          />
        ) : (
          <DefaultInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            value={value}
            placeholder={placeholder || 'Default Field'}
            autoCapitalize={type === 'email' ? 'none' : 'sentences'}
            keyboardType={keyboardType}
          />
        )}
      </View>
      {dropdown && dropDownContent.length > 0 && (
        <Animated.View
          style={[
            dropDownContent.length > 0 && styles.dropDown,
            {opacity: fadeAnim},
          ]}>
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
        </Animated.View>
      )}
    </>
  );
};


export default InputFieldText;
