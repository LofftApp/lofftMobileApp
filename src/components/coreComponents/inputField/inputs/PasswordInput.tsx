import React, {useState} from 'react';
import {View, TextInput, Pressable, StyleSheet} from 'react-native';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {size} from 'react-native-responsive-sizes';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import {inputStyles} from './inputStylesheet';

type PasswordInputProps = {
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

const PasswordInput = ({
  placeholder = 'Password',
  onChangeText,
  value,
  autoCapitalize = 'none',
  keyboardType,
  errorMessage,
}: PasswordInputProps) => {
  const [focus, setFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainerWithIcon,
          inputStyles.input,
          focus && inputStyles.focus,
          !!errorMessage && inputStyles.errorActive,
        ]}>
        <TextInput
          value={value}
          secureTextEntry={hidePassword}
          onChangeText={onChangeText}
          style={[fontStyles.bodyMedium, styles.passwordInput]}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
        <Pressable
          style={styles.icon}
          onPress={() => setHidePassword(!hidePassword)}>
          <LofftIcon name={hidePassword ? 'eye' : 'eye-off'} size={20} />
        </Pressable>
      </View>
      <ErrorMessage isInputField message={errorMessage ?? ''} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    paddingLeft: size(10),
  },
  icon: {
    paddingRight: size(10),
  },
});
export default PasswordInput;
