import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import SignUpForm from '../components/SignUpForm';
import SignInWith from '../components/SignInWith';
import Color from '../styles/lofftColorPallet.json';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.illustration}></View>
      <View style={styles.signUpForm}>
        <SignUpForm />
      </View>
      <View style={styles.signInWith}>
        <SignInWith />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Lavendar['5'],
  },
  illustration: {
    flex: 1,
  },
  signUpForm: {
    flex: 2,
  },
  signInWith: {
    flex: 1,
  },
});

export default SignUpScreen;
