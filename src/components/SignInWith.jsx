import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Color from '../styles/lofftColorPallet.json';

// things to be added:
// 1. 'terms & conditions' (link)
// 2. 'privacy policy' (link)
// 3. 'Sign in' (link)
// 4. Authentication with Apple / Google account
// 5. Firebase to create accounts

const SignInWith = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        ────────{'    '}Or sign in with {'    '}────────
      </Text>
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
      <Text style={styles.text2}>
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
  text1: {
    color: Color.Black[50],
    paddingVertical: 20,
  },
  text2: {
    paddingVertical: 20,
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
    marginHorizontal: 16,
  },
});

export default SignInWith;
