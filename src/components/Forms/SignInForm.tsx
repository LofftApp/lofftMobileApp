import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Redux 🧠
import {useSignInMutation} from 'reduxFeatures/auth/authApi';

// Components 🪢
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

//Validation 🛡️
import {signInSchema} from 'lib/zodSchema';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  const [devMessage, setDevMessage] = useState('');

  const [signIn, {isSuccess, isLoading}] = useSignInMutation();

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrorEmail('');
    setSignInError('');
    setDevMessage('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrorPassword('');
    setSignInError('');
    setDevMessage('');
  };

  const handleForgotPassword = () => {
    if (devMessage) {
      setDevMessage('');
      return;
    }
    setDevMessage('This feature is coming soon');
  };

  const handleSignIn = async () => {
    const validation = signInSchema.safeParse({email, password});
    if (!validation.success) {
      const errEmail = validation.error.flatten().fieldErrors.email?.[0];
      const errPassword = validation.error.flatten().fieldErrors.password?.[0];
      if (errEmail) {
        setErrorEmail(errEmail);
      }
      if (errPassword) {
        setErrorPassword(errPassword);
      }
      return;
    }

    await signIn({
      email: validation.data.email,
      password: validation.data.password,
    });

    if (isSuccess) {
      setPassword('');
      setEmail('');
    } else {
      setSignInError('Email or password is incorrect');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={fontStyles.headerMedium}>Hello again!</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <InputFieldText
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Email"
            type="email"
            keyboardType="email-address"
            errorMessage={errorEmail || signInError}
          />

          <ErrorMessage
            style={styles.errorContainer}
            isInputField
            message={errorEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputFieldText
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            type="password"
            errorMessage={errorPassword || signInError}
          />

          <ErrorMessage
            style={styles.errorContainer}
            isInputField
            message={errorPassword}
          />
          <Pressable onPress={handleForgotPassword}>
            <Text style={[fontStyles.bodyMedium, styles.forgotPassText]}>
              Forgot password?
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.signInContainer}>
        <CoreButton
          value={isLoading ? '' : 'Sign In'}
          icon={isLoading ? <LoadingButtonIcon /> : undefined}
          onPress={handleSignIn}
          disabled={isLoading}
        />
        <ErrorMessage
          style={styles.errorContainer}
          message={signInError || devMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: size(55),
    alignItems: 'center',
    flex: 1,

    gap: size(20),
  },

  inputsContainer: {
    width: '100%',
    gap: size(5),
  },

  errorContainer: {
    height: size(22),
  },

  inputContainer: {
    gap: size(5),
  },
  forgotPassText: {
    alignSelf: 'flex-end',
    color: Color.Blue['100'],
  },
  signInContainer: {
    width: '100%',
    gap: size(5),
  },
});

export default SignInForm;
