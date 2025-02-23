import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//Redux
import {useAuth} from 'reduxFeatures/auth/useAuth';

//Assets 🎨
import {AppleIcon, GoogleIcon} from 'assets';

//Components 🧰

//Helpers 🥷  🏻
import {size} from 'react-native-responsive-sizes';

// API 🧠

// Styles 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';
import {useToast} from 'reduxFeatures/settings/useToast';
import {ToastTypes} from 'reduxFeatures/settings/types';

type SignInWithProps = {
  isSignInScreen: boolean;
};

const SignInWith = ({isSignInScreen}: SignInWithProps) => {
  const {authMessage, setAuthMessage} = useAuth();

  const messageText =
    "Our amazing team is working on this feature. It's coming soon!";

  const {showToast, visible} = useToast({
    condition: !!authMessage,
    message: authMessage,
    type: ToastTypes.Info,
  });

  useEffect(() => {
    if (authMessage && isSignInScreen) {
      const timer = setTimeout(() => {
        setAuthMessage('');
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [authMessage, isSignInScreen, setAuthMessage]);

  const handleSignInWithApple = () => {
    console.log('sign in with apple');
    showToast({
      message: messageText,
      type: ToastTypes.Info,
    });
  };

  const handleSignInWithGoogle = () => {
    console.log('sign in with google');
    showToast({
      message: messageText,
      type: ToastTypes.Error,
      position: 'bottom',
    });
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.signInWithText}>
          ────────{'   '}Or sign in with {'   '}────────
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignInWithApple}
            style={[styles.logInWithButton, visible && styles.disabledButton]}
            disabled={visible}>
            <AppleIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignInWithGoogle}
            style={[styles.logInWithButton, visible && styles.disabledButton]}
            disabled={visible}>
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
  disabledButton: {
    backgroundColor: Colors.Black[30],
    borderColor: Colors.Black[30],
  },
});

export default SignInWith;
