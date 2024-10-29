import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//Redux
import {useAuth} from 'reduxFeatures/auth/useAuth';

//Assets 🎨
import {AppleIcon, GoogleIcon} from 'assets';
import {fontStyles} from 'styleSheets/fontStyles';

//Components 🧰
import LofftIcon from 'components/lofftIcons/LofftIcon';

//Helpers 🥷  🏻
import {size} from 'react-native-responsive-sizes';

// API 🧠

// Styles 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';

type SignInWithProps = {
  isSignInScreen: boolean;
};

const SignInWith = ({isSignInScreen}: SignInWithProps) => {
  const [message, setMessage] = useState('');
  const {authMessage, setAuthMessage} = useAuth();

  const messageText =
    "Our amazing team is working on this feature. It's coming soon!";

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  useEffect(() => {
    if (authMessage && isSignInScreen) {
      setMessage(authMessage);
      const timer = setTimeout(() => {
        setMessage('');
        setAuthMessage('');
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [authMessage, isSignInScreen, setAuthMessage]);

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
        <View style={styles.messageContainer}>
          <View style={styles.messageTextContainer}>
            {authMessage && (
              <LofftIcon
                name={'log-out'}
                size={size(20)}
                color={Colors.Black[100]}
              />
            )}
            <Text style={[fontStyles.bodySmall, {color: Colors.Black[100]}]}>
              {message}
            </Text>
          </View>
        </View>
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
    top: size(24),
    backgroundColor: Colors.Mint[20],
    padding: size(10),
    borderRadius: 12,
    zIndex: 1,
    height: size(75),
    width: '80%',
    justifyContent: 'center',
  },
  messageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
    justifyContent: 'center',
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
