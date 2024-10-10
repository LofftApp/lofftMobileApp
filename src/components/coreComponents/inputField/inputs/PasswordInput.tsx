import React, {useState} from 'react';
import {View, TextInput, Pressable} from 'react-native';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {styles} from './styleSheet';

const PasswordInput = ({
  placeholder = 'Password',
  onChangeText,
  onFocus = null,
  onBlur = null,
  value,
}: any) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        secureTextEntry={hidePassword}
        onChangeText={onChangeText}
        style={[styles.inputFieldTextStyle, fontStyles.bodyMedium]}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      <Pressable onPress={() => setHidePassword(!hidePassword)}>
        <LofftIcon name={hidePassword ? 'eye' : 'eye-off'} size={20} />
      </Pressable>
    </View>
  );
};

export default PasswordInput;
