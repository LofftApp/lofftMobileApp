import React, {useState} from 'react';
import {View, TextInput, Pressable} from 'react-native';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Styles 🖼️
import {InputStyleSheet} from './styleSheet';
import { useTheme } from 'components/themes/ThemeContext';
import Color from 'styleSheets/lofftColorPallet.json';
import { createFontStyles } from 'styleSheets/fontStyles';

type PasswordInputProps = {
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

const PasswordInput = ({
  placeholder = 'Password',
  onChangeText,
  onFocus,
  onBlur,
  value,
  autoCapitalize = 'none',
  keyboardType,
}: PasswordInputProps) => {

  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);
  const inputStyleSheet = InputStyleSheet();

  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View style={inputStyleSheet.inputContainerWithIcon}>
      <TextInput
        value={value}
        secureTextEntry={hidePassword}
        onChangeText={onChangeText}
        style={[fontStyles.bodyMedium]}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={colors.Black[5]}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
      <Pressable onPress={() => setHidePassword(!hidePassword)}>
        <LofftIcon color={colors.Black[100]} name={hidePassword ? 'eye' : 'eye-off'} size={20} />
      </Pressable>
    </View>
  );
};

export default PasswordInput;
