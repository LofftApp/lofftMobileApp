import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
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
      <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
        <LofftIcon name={hidePassword ? 'eye' : 'eye-off'} size={20} />
        {/* <Icon
          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          size={20}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;