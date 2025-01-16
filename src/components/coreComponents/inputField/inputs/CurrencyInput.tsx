import React from 'react';
import {View, TextInput} from 'react-native';

// Components 🖼️
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Styles 🖼️
import {InputStyleSheet} from './styleSheet';
import Color from 'styleSheets/lofftColorPallet.json';
import {Dollar, Pound} from 'assets';
import {Currency} from 'reduxFeatures/assets/types';
import { createFontStyles } from 'styleSheets/fontStyles';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';

type CurrencyInputProps = {
  placeholder?: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
  currency: Currency;
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
const CurrencyInput = ({
  placeholder = 'Text',
  onChangeText,
  onFocus,
  onBlur,
  value,
  keyboardType,
  currency = 'eur',
}: CurrencyInputProps) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const inputStyleSheet = InputStyleSheet();
  return (
    <View style={inputStyleSheet.inputContainerWithIcon}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={fontStyles.bodyMedium}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={colors.Black[5]}
        keyboardType={keyboardType}
      />
      {currency === 'eur' && (
        <LofftIcon name={'currency-euro'} size={22} color={colors.Black[30]} />
      )}
      {currency === 'gbp' && (
        <Pound height={30} width={30} color={colors.Black[30]} />
      )}
      {currency === 'usd' && (
        <Dollar height={30} width={30} color={colors.Black[30]} />
      )}
    </View>
  );
};

export default CurrencyInput;
