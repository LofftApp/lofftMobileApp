import React from 'react';
import {View, TextInput} from 'react-native';
import {fontStyles} from '../../../../styles/fontStyles';
import {styles} from './styleSheet';
const DefaultInput = ({
  placeholder = 'Text',
  onChangeText,
  onFocus = null,
  onBlur = null,
  value,
}: any) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputFieldTextStyle, fontStyles.bodyMedium]}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    </View>
  );
};

export default DefaultInput;
