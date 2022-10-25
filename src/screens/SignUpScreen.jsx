import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import SignUpForm from '../components/SignUpForm';
import SignInWith from '../components/SignInWith';

const SignUpScreen = () => {
  return (
    <View style={styles.mainView}>
      <View style={{flex: 1}}></View>
      <SignUpForm style={{flex: 2}} />
      {/* <SignInWith /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'yellow',
  },
  FormView: {
    position: 'absolute',
    top: '100px',
  },
});

export default SignUpScreen;
