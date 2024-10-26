import React, {useEffect, useState} from 'react';
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

type SignInFormProps = {
  clearErrors: boolean;
  setClearErrors: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignInForm = ({clearErrors, setClearErrors}: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  const [devMessage, setDevMessage] = useState('');

  const [signIn, {isLoading}] = useSignInMutation();

  useEffect(() => {
    if (clearErrors) {
      setErrorEmail('');
      setErrorPassword('');
      setSignInError('');
    }
    setClearErrors(false);
  }, [clearErrors, setClearErrors]);

  const handleEmailChange = (input: string) => {
    setEmail(input);
    setErrorEmail('');
    setSignInError('');
    setDevMessage('');
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
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
    try {
      await signIn({
        email: validation.data.email,
        password: validation.data.password,
      }).unwrap();
      setEmail('');
      setPassword('');
    } catch (error) {
      const typedError = error as {
        status?: number | 'FETCH_ERROR';
      };
      if (typedError.status === 401) {
        setSignInError('Invalid email or password');
      } else if (typedError.status === 'FETCH_ERROR') {
        setSignInError('Network error. Please check connection or server');
      } else if (typedError.status === 403) {
        setSignInError('Wrong tokens. Check environment variables');
      } else {
        setSignInError('An unexpected error occurred. Please try again.');
      }
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

          <ErrorMessage isInputField message={errorEmail} />
        </View>
        <View style={styles.inputContainer}>
          <InputFieldText
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            type="password"
            errorMessage={errorPassword || signInError}
          />

          <ErrorMessage isInputField message={errorPassword} />
        </View>
        <Pressable onPress={handleForgotPassword}>
          <Text style={[fontStyles.bodyMedium, styles.forgotPassText]}>
            Forgot password?
          </Text>
        </Pressable>
      </View>
      <View style={styles.signInContainer}>
        <CoreButton
          value={isLoading ? '' : 'Sign In'}
          icon={isLoading ? <LoadingButtonIcon /> : undefined}
          onPress={handleSignIn}
          disabled={isLoading}
        />
        <ErrorMessage message={signInError || devMessage} />
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
    gap: size(10),
  },

  inputContainer: {
    gap: size(3),
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
