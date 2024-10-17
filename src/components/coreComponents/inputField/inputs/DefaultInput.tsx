import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {styles} from './styleSheet';

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
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[fontStyles.bodyMedium, styles.input]}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
  );
};

export default DefaultInput;
