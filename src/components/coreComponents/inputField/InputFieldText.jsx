import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';
import PasswordInput from './inputs/PasswordInput';
import SearchInput from './inputs/SearchInput';
import DefaultInput from './inputs/DefaultInput';
import {styles} from './styleSheet';

const InputFieldText = ({
  placeholder = null,
  type = null,
  onChangeText,
  value,
  onClear = null,
  errorMessage = '',
  keyboardType = 'default',
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <View
        style={[
          styles.inputFieldStyle,
          focus ? styles.focus : null,
          errorMessage ? styles.errorActive : null,
        ]}>
        {type === 'password' ? (
          <PasswordInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            value={value}
            placeholder={placeholder}
            autoCapitalize="none"
            keyboardType={keyboardType}
          />
        ) : type === 'search' ? (
          <SearchInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onClear={onClear}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
          />
        ) : (
          <DefaultInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onClear={() => setText('')}
            value={value}
            placeholder={placeholder}
            autoCapitalize={type === 'email' ? 'none' : 'sentences'}
            keyboardType={keyboardType}
          />
        )}
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

export default InputFieldText;
