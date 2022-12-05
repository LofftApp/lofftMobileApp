import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Color from '../styles/lofftColorPallet.json';
import {AppleIcon} from '../assets';
import {GoogleIcon} from '../assets';
import {onAppleButtonPress} from '../api/firebase/firebaseAuth';

// things to be added:
// 1. 'terms & conditions' (link)
// 2. 'privacy policy' (link)
// 4. Authentication with Apple / Google account

const SignInWith = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        ────────{'    '}Or sign in with {'    '}────────
      </Text>
      <View style={styles.buttonWrap}>
        <Pressable
          onPress={() => onAppleButtonPress()}
          style={styles.logInWithButton}>
          <AppleIcon style={styles.image} />
        </Pressable>
        <Pressable style={styles.logInWithButton}>
          <GoogleIcon style={styles.image} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  text1: {
    color: Color.Black[50],
    paddingVertical: 20,
  },
  buttonWrap: {
    flexDirection: 'row',
  },
  logInWithButton: {
    width: 64,
    height: 48,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});

export default SignInWith;
