import React from 'react';
import {View, TextInput} from 'react-native';

// Components 🖼️
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {styles} from './styleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

type CurrencyInputProps = {
  placeholder?: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
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
      <LofftIcon name={'currency-euro'} size={20} color={Color.Black[30]} />
    </View>
  );
};

export default CurrencyInput;
