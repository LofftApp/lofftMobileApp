import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// API 🧠
import {
  onAppleButtonPress,
  onGoogleButtonPress,
} from '@Api/firebase/firebaseAuth';

// Styles 🖼️
import Colors from '@StyleSheets/lofftColorPallet.json';

// Assets 💿
import {AppleIcon} from '../assets';
import {GoogleIcon} from '../assets';

const SignInWith = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.signInWithContianer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.text}>Or sign in with</Text>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.buttonWrap}>
        <TouchableOpacity
          onPress={() => onAppleButtonPress()}
          style={styles.logInWithButton}>
          <AppleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onGoogleButtonPress()}
          style={styles.logInWithButton}>
          <GoogleIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  text: {
    color: Colors.Black[50],
    paddingVertical: 20,
    marginHorizontal: 15,
  },
  buttonWrap: {
    flexDirection: 'row',
  },
  logInWithButton: {
    width: 64,
    height: 48,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Colors.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  syncButton: {
    borderColor: Colors.Tomato[100],
  },
  signInWithContianer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  horizontalLine: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.Black[50],
  },
});

export default SignInWith;
