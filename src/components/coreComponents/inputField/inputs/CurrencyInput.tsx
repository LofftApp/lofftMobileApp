import React from 'react';
import {View, TextInput} from 'react-native';

// Components 🖼️
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {styles} from './styleSheet';
import Color from 'styleSheets/lofftColorPallet.json';
import {Dollar, Pound} from 'assets';
import {Currency} from 'reduxFeatures/assets/types';

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
  return (
    <View style={styles.inputContainerWithIcon}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={fontStyles.bodyMedium}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      {currency === 'eur' && (
        <LofftIcon name={'currency-euro'} size={22} color={Color.Black[30]} />
      )}
      {currency === 'gbp' && (
        <Pound height={30} width={30} color={Color.Black[30]} />
      )}
      {currency === 'usd' && (
        <Dollar height={30} width={30} color={Color.Black[30]} />
      )}
    </View>
  );
};

export default CurrencyInput;
