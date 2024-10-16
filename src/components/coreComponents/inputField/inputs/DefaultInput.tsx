import React from 'react';
import {TextInput} from 'react-native';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {styles} from './styleSheet';


const DefaultInput = ({
  placeholder = 'Text',
  onChangeText,
  onFocus = null,
  onBlur = null,
  value,
  autoCapitalize,
  keyboardType = 'default',
}: any) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[fontStyles.bodyMedium, styles.inputFieldTextStyle]}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
  );
};

export default DefaultInput;
