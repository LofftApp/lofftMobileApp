import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';
import PasswordInput from './inputs/PasswordInput';
import SearchInput from './inputs/SearchInput';
import DefaultInput from './inputs/DefaultInput';

const InputFieldText = ({
  placeholder = null,
  type = null,
  onChangeText,
  value,
  onClear = null,
  errorMessage = '',
}) => {
  const [focus, setFocus] = useState(false);
  console.log(value);
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
          />
        ) : type === 'search' ? (
          <SearchInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onClear={onClear}
            value={value}
            placeholder={placeholder}
          />
        ) : (
          <DefaultInput
            onChangeText={onChangeText}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onClear={() => setText('')}
            value={value}
            placeholder={placeholder}
          />
        )}
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.Black[80],
    paddingHorizontal: 8,
    height: 48,
    justifyContent: 'center',
  },
  focus: {
    borderColor: colors.Lavendar[100],
  },
  errorMessage: {
    margin: 5,
    color: colors.Tomato[100],
  },
  errorActive: {
    borderColor: colors.Tomato[100],
  },
});

export default InputFieldText;
