import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Sync Notion
import {seedUsers} from './../seeding/notionSeedingSetup';

// API 🧠
import {onAppleButtonPress, onGoogleButtonPress} from '@Firebase/firebaseAuth';

// Components 🪢
import LofftIcon from './lofftIcons/LofftIcon';

// Styles 🖼️
import Colors from '@StyleSheets/lofftColorPallet.json';

// Assets 💿
import {AppleIcon} from '../assets';
import {GoogleIcon} from '../assets';

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
          <AppleIcon />
        </Pressable>
        <Pressable
          onPress={() => onGoogleButtonPress()}
          style={styles.logInWithButton}>
          <GoogleIcon />
        </Pressable>
        {__DEV__ ? (
          <Pressable
            onPress={() => seedUsers()}
            style={[styles.logInWithButton, styles.syncButton]}>
            <LofftIcon
              name="refresh-ccq-03"
              size={30}
              color={Colors.Tomato['100']}
            />
          </Pressable>
        ) : null}
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
