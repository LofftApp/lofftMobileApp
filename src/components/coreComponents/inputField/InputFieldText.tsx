import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Components 🪢
import PasswordInput from './inputs/PasswordInput';
import SearchInput from './inputs/SearchInput';
import DefaultInput from './inputs/DefaultInput';

// Style 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

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
            placeholder={placeholder}
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
            placeholder={placeholder}
            keyboardType={keyboardType}
            dropdown={dropdown}
          />
        ) : (
          <DefaultInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            value={value}
            placeholder={placeholder}
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
              <Pressable onPress={() => dropDownPressAction(value)}>
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
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: Color.Black[50],
    paddingHorizontal: 8,
    height: 48,
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
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    minHeight: 48,
    justifyContent: 'center',
  },
  dropDownItem: {
    marginVertical: 2,
    borderBottomWidth: 3,
    padding: 3,
    borderBottomColor: Color.Black[100],
  },
  oddPlaceList: {
    backgroundColor: Color.Lavendar[10],
  },
  errorMessage: {
    margin: 5,
    color: Color.Tomato[100],
  },
  errorActive: {
    borderColor: Color.Tomato[100],
  },
});

export default InputFieldText;
