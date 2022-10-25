import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const SignUpForm = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View>
      <Text>Create account</Text>
      <TextInput placeholder="Email"></TextInput>
      <TextInput placeholder="Password"></TextInput>
      <TextInput placeholder="Repeat Password"></TextInput>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
      />
      <Text>I agree to...</Text>
      <Button title="Sign Up"></Button>
    </View>
  );
};

export default SignUpForm;
