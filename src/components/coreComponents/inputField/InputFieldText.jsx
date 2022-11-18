import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';
import {fontStyles} from '../../../styles/fontStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const InputFieldText = ({placeholder = null, style = null}) => {
  const [focused, setFocues] = useState(false);
  const [text, setText] = useState('');
  return (
    <View style={[styles.inputFieldStyle, focused ? styles.focused : null]}>
      <Icon name="search-outline" size={18} />
      <TextInput
        style={[styles.inputFieldTextStyle, fontStyles.bodyMedium, style]}
        placeholder={placeholder}
        onFocus={() => setFocues(true)}
        onBlur={() => setFocues(false)}
        value={text}
        onChangeText={t => setText(t)}
      />
      <TouchableOpacity onPress={() => setText('')}>
        <Icon name="close-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.Black[80],
    paddingHorizontal: 8,
  },
  inputFieldTextStyle: {
    margin: 0,
    marginLeft: 11,
    paddingVertical: 8,
    flex: 1,
  },
  focused: {
    borderColor: colors.Lavendar[100],
  },
});

export default InputFieldText;
