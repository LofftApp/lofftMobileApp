import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import SignInForm from '../components/SignInForm';
import SignInWith from '../components/SignInWith';
import Color from '../styles/lofftColorPallet.json';
import {SignInBackground} from '../assets';
import {HiFive} from '../assets';

const SignInScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <HiFive style={styles.image} />
      </View>
      <SignInBackground style={styles.backgroundImage} />
      <View style={styles.formWrap}>
        <View style={styles.signInForm}>
          <SignInForm />
        </View>
        <View style={styles.signInWith}>
          <SignInWith />
          <Text style={styles.text}>
            Don't have an account yet?{'     '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('SignUpScreen')}>
              Sign Up
            </Text>
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
    marginTop: -10,
  },
  backgroundImage: {
    position: 'absolute',
    top: -70,
    zIndex: 1,
  },
  imageWrap: {
    zIndex: 3,
    flex: 1,
    alignItems: 'center',
  },
  formWrap: {
    zIndex: 2,
    flex: 4,
    paddingHorizontal: 10,
    backgroundColor: Color.White['100'],
    borderRadius: 30,
  },
  signInForm: {
    flex: 2,
  },
  signInWith: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    paddingBottom: 40,
    fontSize: 16,
    fontWeight: '500',
  },
  link: {
    color: Color.Blue['100'],
  },
});

export default SignInScreen;
