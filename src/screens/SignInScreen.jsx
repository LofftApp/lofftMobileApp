import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import SignInForm from '../components/SignInForm';
import SignInWith from '../components/SignInWith';
import Color from '../styles/lofftColorPallet.json';

import SigninSVGImage from '../assets/background/signin.svg';

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require('../assets/ilustration/Hi-five.png')}
        />
      </View>
      {/* <SvgXml width="100%" xml={xml} style={styles.backgroundImage} /> */}
      <View style={styles.formWrap}>
        <View style={styles.signInForm}>
          <SignInForm />
        </View>
        <View style={styles.signInWith}>
          <SignInWith />
          <Text style={styles.text}>
            Don't have an account yet? <Text>Sign Up</Text>
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
    marginTop: 50,
  },
  backgroundImage: {
    position: 'absolute',
    top: -70,
  },
  imageWrap: {
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
  },
  formWrap: {
    zIndex: 1,
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
  },
});

export default SignInScreen;
