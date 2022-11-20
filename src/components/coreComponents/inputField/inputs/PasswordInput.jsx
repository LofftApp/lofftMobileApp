import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontStyles} from '../../../../styles/fontStyles';
import {styles} from './styleSheet';
const PasswordInput = ({
  placeholder = 'Password',
  onChangeText,
  onFocus = null,
  onBlur = null,
  value,
}) => {
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
      <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
        <Icon
          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
