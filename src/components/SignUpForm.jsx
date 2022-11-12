import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import Input from './Input';
import Color from '../styles/lofftColorPallet.json';

const SignUpForm = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.textInputWrap}>
        <Input props="Email"></Input>
        <Input props="Create password"></Input>
        <Input props="Repeat password"></Input>
        <View style={styles.checkBoxWrap}>
          {/* <CheckBox
            disabled={false}
            value={toggleCheckBox}
            style={styles.checkBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          /> */}
          <Text>I agree to...</Text>
        </View>
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
    paddingBottom: 20,
  },
  textInputWrap: {
    width: '100%',
    borderColor: 'black',
    // borderWidth: 1,
    // flex: 2,
  },
  button: {
    // flex: 1,
  },
  checkBoxWrap: {
    flexDirection: 'row',
  },
  checkBox: {
    // width: 50,
    // height: 50,
    boxType: 'BEMBoxTypeSquare',
    tintColor: Color.Lavendar['100'],
    margin: 10,
  },
});

export default SignUpForm;
