import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Color from '../styles/lofftColorPallet.json';

const SignInWith = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text style={styles.textDecoration}>
          ──────── Or sign in with ────────
        </Text>
      </View>
      <View style={styles.buttonWrap}>
        <Pressable style={styles.logInWithButton}>
          <Image
            style={styles.image}
            source={require('../assets/icons/Apple-icon.png')}
          />
        </Pressable>
        <Pressable style={styles.logInWithButton}>
          <Image
            style={styles.image}
            source={require('../assets/icons/Google-icon.png')}
          />
        </Pressable>
      </View>
      <Text>
        Already have an account? <Text>Sign in</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  buttonWrap: {
    flexDirection: 'row',
    padding: 10,
  },
  logInWithButton: {
    width: 64,
    height: 48,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInWith;
