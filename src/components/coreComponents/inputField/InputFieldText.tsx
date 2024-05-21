import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { width, height, size, fontSize } from "react-native-responsive-sizes";

// Components 🪢
import PasswordInput from './inputs/PasswordInput';
import SearchInput from './inputs/SearchInput';
import CurrencyInput from './inputs/CurrencyInput';
import DefaultInput from './inputs/DefaultInput';

// Style 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

const InputFieldText = ({
  placeholder = null,
  type = null,
  onChangeText,
  value,
  onClear = null,
  errorMessage = '',
  keyboardType = 'default',
  dropdown = false,
  dropDownContent = [],
  dropDownPressAction = null,
  style,
}: any) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <View
        style={[
          styles.inputFieldStyle,
          dropdown && value.length > 0 ? styles.inputDropDown : null,
          focus ? styles.focus : null,
          errorMessage ? styles.errorActive : null,
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
        ) : type == 'currency' ? (
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
            onFocus={() => setFocus(true)}
            value={value}
            placeholder={placeholder || 'Default Field'}
            autoCapitalize={type === 'email' ? 'none' : 'sentences'}
            keyboardType={keyboardType}
            dropdown={dropdown}
          />
        )}
      </View>
      {dropdown && value.length > 0 ? (
        <View style={styles.dropDown}>
          {dropDownContent.map((value: any, i: number) => {
            return (
              <Pressable onPress={() => dropDownPressAction(value)} key={i}>
                <Text
                  style={[
                    fontStyles.bodyMedium,
                    styles.dropDownItem,
                    i % 2 !== 0 ? styles.oddPlaceList : null,
                  ]}>
                  {value}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    marginBottom: size(8),
    borderWidth: size(2),
    borderRadius: size(12),
    borderColor: Color.Black[50],
    paddingHorizontal: size(8),
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
    borderWidth: size(2),
    borderTopWidth: size(1),
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
    padding: size(3),
    borderBottomColor: Color.Black[100],
  },
  oddPlaceList: {
    backgroundColor: Color.Lavendar[10],
  },
  errorMessage: {
    margin: size(5),
    color: Color.Tomato[100],
  },
  errorActive: {
    borderColor: Color.Tomato[100],
  },
});

export default InputFieldText;
