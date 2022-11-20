import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import Input from './Input';
import Color from '../styles/lofftColorPallet.json';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SignUpButton from './coreComponents/buttons/SignUpButton';
import InputFieldText from '../components/coreComponents/inputField/InputFieldText';

const SignInForm = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello again!</Text>
      <View style={styles.textInputWrap}>
        <InputFieldText placeholder="Email" type="email" />
        <InputFieldText placeholder="Password" type="password" />
        <Text style={styles.text}>Forgot password?</Text>
      </View>
      <View style={styles.signUpButtonView}>
        <SignUpButton props="Sign in"></SignUpButton>
      </View>
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
  },
  text: {
    fontSize: 13,
    paddingTop: 15,
    paddingHorizontal: 10,
    // alignItems: 'flex-end',
  },
  signUpButtonView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default SignInForm;
0;
