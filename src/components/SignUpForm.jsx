import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const SignUpForm = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.textInputWrap}>
        <TextInput style={styles.textInput} placeholder="Email"></TextInput>
        <TextInput style={styles.textInput} placeholder="Password"></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Repeat Password"></TextInput>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text>I agree to...</Text>
      </View>
      <Button style={styles.button} title="Sign Up"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  textInputWrap: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'space-between',
    // flex: 2,
  },
  textInput: {
    width: '100%',
    height: '15%',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
  },
  button: {
    flex: 1,
  },
});

export default SignUpForm;
