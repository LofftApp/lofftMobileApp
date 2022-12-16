import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

// Components 🪢
import SignUpForm from '@Components/Forms/SignUpForm';
import SignInWith from '@Components/SignInWith';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

// Assets 🛠️
import {Search} from '../assets';
import {SignUpBackground} from '../assets';

const SignUpScreen = ({navigation}) => {
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
            Already have an account?{'     '}
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}>
              <Text style={styles.link}>Sign in</Text>
            </TouchableOpacity>
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
    // marginTop: -60,
  },
  imageWrap: {
    // paddingTop: 130,
    zIndex: 3,
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: -20,
    zIndex: 1,
  },
  formWrap: {
    flex: 3,
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
    fontWeight: '500',
  },
  link: {
    color: Color.Blue['100'],
  },
});

export default SignUpScreen;
