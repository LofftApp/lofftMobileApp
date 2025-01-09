import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//Redux
import {useAuth} from 'reduxFeatures/auth/useAuth';

//Assets 🎨
import { AppleIcon, GoogleIcon, AppleIconWhite} from 'assets';

//Components 🧰
import LofftIcon from 'components/lofftIcons/LofftIcon';

//Helpers 🥷  🏻
import {size} from 'react-native-responsive-sizes';

// API 🧠

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';

type SignInWithProps = {
  isSignInScreen: boolean;
};

const SignInWith = ({isSignInScreen}: SignInWithProps) => {
  const [message, setMessage] = useState('');
  const {authMessage, setAuthMessage} = useAuth();

  const {isDarkMode}: any = useTheme();
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;

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

  const styles = StyleSheet.create({
    messageContainer: {
      position: 'absolute',
      top: size(24),
      backgroundColor: colors.Mint[20],
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
      color: colors.Black[50],
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
      borderColor: colors.Lavendar[100],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <>
      {message && (
        <View style={styles.messageContainer}>
          <View style={styles.messageTextContainer}>
            {authMessage && (
              <LofftIcon
                name={'log-out'}
                size={size(20)}
                color={colors.Black[100]}
              />
            )}
            <Text style={[fontStyles.bodySmall, {color: colors.Black[100]}]}>
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
              {isDarkMode ? <AppleIconWhite /> : <AppleIcon />}
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

export default SignInWith;
