import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// API 🧠
import {
  onAppleButtonPress,
  onGoogleButtonPress,
} from '@Api/firebase/firebaseAuth';

// Components 🪢
import LofftIcon from './lofftIcons/LofftIcon';
import {SeedButton} from '@Redux/seeding/SeedButton';

// Styles 🖼️
import Colors from '@StyleSheets/lofftColorPallet.json';

// Assets 💿
import {AppleIcon} from '../assets';
import {GoogleIcon} from '../assets';

const SignInWith = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        ────────{'    '}Or sign in with {'    '}────────
      </Text>
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
    flex: 1,
  },
  text1: {
    color: Colors.Black[50],
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
    borderColor: Colors.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  syncButton: {
    borderColor: Colors.Tomato[100],
  },
});

export default SignInWith;
