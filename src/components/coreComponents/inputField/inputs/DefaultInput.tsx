import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {inputStyles} from './inputStylesheet';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

type DefaultInputProps = {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  errorMessage?: string;
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
  value,
  autoCapitalize,
  keyboardType = 'default',
  errorMessage,
}: DefaultInputProps) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          fontStyles.bodyMedium,
          inputStyles.input,
          inputStyles.paddingLeft,
          focus && inputStyles.focus,
          !!errorMessage && inputStyles.errorActive,
        ]}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
      <ErrorMessage isInputField message={errorMessage ?? ''} />
    </View>
  );
};

export default DefaultInput;
