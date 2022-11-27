import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import SignUpForm from '../components/SignUpForm';
import SignInWith from '../components/SignInWith';
import Color from '../styles/lofftColorPallet.json';
import {Search} from '../assets';
import {SignUpBackground} from '../assets';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Search style={styles.image} />
      </View>
      <SignUpBackground style={styles.backgroundImage} />
      <View style={styles.formWrap}>
        <View style={styles.signUpForm}>
          <SignUpForm />
        </View>
        <View style={styles.signInWith}>
          <SignInWith />
          <Text style={styles.text}>
            Already have an account? <Text>Sign in</Text>
          </Text>
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
    height: '70%',
    overflow: 'visible',
    marginTop: -60,
  },
  imageWrap: {
    paddingTop: 130,
    zIndex: 3,
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: -85,
    zIndex: 1,
  },
  formWrap: {
    flex: 4,
    zIndex: 2,
    paddingHorizontal: 10,
    backgroundColor: Color.White['100'],
    borderRadius: 30,
  },
  signUpForm: {
    flex: 2,
  },
  signInWith: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    paddingBottom: 40,
    fontSize: 16,
  },
});

export default SignUpScreen;
