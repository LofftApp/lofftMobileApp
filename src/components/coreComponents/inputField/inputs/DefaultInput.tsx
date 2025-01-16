import React from 'react';
import {TextInput} from 'react-native';

// Styles 🖼️
import {InputStyleSheet} from './styleSheet';
import { createFontStyles } from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';

type DefaultInputProps = {
  placeholder?: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
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

const DefaultInput = ({
  placeholder = 'Text',
  onChangeText,
  onFocus,
  onBlur,
  value,
  autoCapitalize,
  keyboardType = 'default',
}: DefaultInputProps) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const fontStyles = createFontStyles(isDarkMode);
  const inputStyleSheet = InputStyleSheet();
  const colors = isDarkMode ? Color.Dark : Color.Light;

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[fontStyles.bodyMedium, inputStyleSheet.input]}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      placeholderTextColor={colors.Black[5]}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
  );
};

export default DefaultInput;
