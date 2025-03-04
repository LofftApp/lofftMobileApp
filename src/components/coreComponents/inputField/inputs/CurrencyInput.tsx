import React, {useState} from 'react';
import {View, TextInput, StyleProp, ViewStyle} from 'react-native';

// Components 🖼️
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {Dollar, Pound} from 'assets';
import {Currency} from 'reduxFeatures/assets/types';
import {inputStyles} from './inputStylesheet';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

type CurrencyInputProps = {
  placeholder?: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
  currency?: Currency;
  errorMessage?: string;
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
const CurrencyInput = ({
  placeholder = 'Currency',
  onChangeText,
  value,
  keyboardType,
  currency = 'eur',
  errorMessage,
  style,
}: CurrencyInputProps) => {
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
          inputStyles.inputContainerWithIcon,
          inputStyles.input,
          focus && inputStyles.focus,
          !!errorMessage && inputStyles.errorActive,
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[fontStyles.bodyMedium, inputStyles.paddingLeft]}
          onBlur={handleBlur}
          onFocus={handleFocus}
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
      <ErrorMessage isInputField message={errorMessage ?? ''} />
    </View>
  );
};

export default CurrencyInput;
