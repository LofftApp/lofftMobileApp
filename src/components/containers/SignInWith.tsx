import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// API 🧠

// Styles 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';

// navigation removed from SignInWith component to remove error.
const SignInWith = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        ────────{'    '}Or sign in with {'    '}────────
      </Text>
      <View style={styles.buttonWrap}>
        {/* <TouchableOpacity
          onPress={() => onAppleButtonPress()}
          style={styles.logInWithButton}>
          <AppleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onGoogleButtonPress()}
          style={styles.logInWithButton}>
          <GoogleIcon />
        </TouchableOpacity> */}
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