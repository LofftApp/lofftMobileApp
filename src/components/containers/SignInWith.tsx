import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//Assets 🎨
import {AppleIcon, GoogleIcon} from 'assets';

//Components 🧰
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

//Helpers 🥷  🏻
import {size} from 'react-native-responsive-sizes';

// API 🧠

// Styles 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';

const SignInWith = () => {
  const [message, setMessage] = useState('');

  const messageText =
    "Our amazing team is working on this feature. It's coming soon!";

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const handleSignInWithApple = () => {
    console.log('sign in with apple');
    setMessage(messageText);
  };

  const handleSignInWithGoogle = () => {
    console.log('sign in with google');
    setMessage(messageText);
  };
  return (
    <>
      {message && (
        <ErrorMessage message={message} style={styles.messageContainer} />
      )}
      <View style={styles.mainContainer}>
        <Text style={styles.signInWithText}>
          ────────{'   '}Or sign in with {'   '}────────
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignInWithApple}
            style={styles.logInWithButton}>
            <AppleIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignInWithGoogle}
            style={styles.logInWithButton}>
            <GoogleIcon />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    position: 'absolute',
    top: size(30),
    backgroundColor: Colors.Tomato[10],
    padding: size(5),
    zIndex: 1,
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    gap: size(20),
  },
  signInWithText: {
    color: Colors.Black[50],
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: size(16),
  },
  logInWithButton: {
    width: size(74),
    height: size(58),
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Colors.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInWith;
