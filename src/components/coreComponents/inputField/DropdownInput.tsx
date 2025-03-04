import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  TextInput,
} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Style 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Types 🏷️
import type {DropdownInputProps} from './types';
import {inputStyles} from './inputs/inputStylesheet';

const DropdownInput = ({
  placeholder,
  onChangeText,
  value,
  onClear = () => {},
  errorMessage = '',
  keyboardType = 'default',
  dropdown = false,
  dropDownContent = [],
  dropDownPressAction = () => {},
  style,
}: DropdownInputProps) => {
  const [focus, setFocus] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

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

  return (
    <>
      <View
        style={[
          inputStyles.inputContainerWithIcon,
          inputStyles.input,
          dropdown &&
            value.length > 0 &&
            dropDownContent.length > 0 &&
            styles.inputDropDown,
          focus && inputStyles.focus,
          !!errorMessage && inputStyles.errorActive,
          style,
        ]}>
        <View
          style={[inputStyles.searchIconContainer, inputStyles.paddingLeft]}>
          <LofftIcon name={'search-sm'} size={25} color={Color.Black[50]} />
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={[fontStyles.bodyMedium]}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder ?? 'Search'}
            keyboardType={keyboardType}
          />
        </View>
        {value ? (
          <Pressable onPress={onClear} style={inputStyles.clearContainer}>
            <LofftIcon name="x-close" size={20} color={Color.Black[50]} />
          </Pressable>
        ) : null}
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
                <Text style={[fontStyles.bodyMedium, styles.dropDownItem]}>
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

const styles = StyleSheet.create({
  inputDropDown: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  dropDown: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderTopColor: Color.Lavendar[100],
    borderColor: Color.Lavendar[100],
    borderBottomLeftRadius: size(16),
    borderBottomRightRadius: size(16),
    minHeight: size(48),
    justifyContent: 'center',
  },
  dropDownItem: {
    marginVertical: 2,
    paddingVertical: size(6),
    paddingHorizontal: size(8),
  },
});

export default DropdownInput;
