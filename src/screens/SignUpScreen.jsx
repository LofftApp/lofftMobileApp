import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import SignUpForm from '../components/SignUpForm';
import SignInWith from '../components/SignInWith';
import Color from '../styles/lofftColorPallet.json';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require('../assets/ilustration/search.png')}
        />
      </View>
      <View style={styles.formWrap}>
        <View style={styles.signUpForm}>
          <SignUpForm />
        </View>
        <View style={styles.signInWith}>
          <SignInWith />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Lavendar['5'],
  },
  image: {
    height: '100%',
    position: 'relative',
    zIndex: 2,
  },
  imageWrap: {
    flex: 1,
  },
  formWrap: {
    flex: 3,
    backgroundColor: Color.White['100'],
  },
  signUpForm: {
    flex: 2,
  },
  signInWith: {
    flex: 1,
  },
});

export default SignUpScreen;
