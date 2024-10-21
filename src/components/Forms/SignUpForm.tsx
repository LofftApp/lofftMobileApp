import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// API 🌎
import {useSignUpMutation} from 'reduxFeatures/auth/authApi';

// Components 🪢
import SignUpButton from 'components/buttons/SignUpButton';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';

// Stylesheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import {signUpSchema} from 'lib/zodSchema';

const SignUpForm = () => {
  const [checkbox, setCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message] = useState({target: null, message: null});

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorRepeatPassword, setErrorRepeatPassword] = useState('');
  const [errorTerms, setErrorTerms] = useState('');
  const [errorSignUp, setErrorSignUp] = useState('');

  const [signUp, {isLoading}] = useSignUpMutation();

  const handleSignUp = async () => {
    const validation = signUpSchema.safeParse({
      email,
      password,
      repeatPassword,
      terms: checkbox,
    });

    if (!validation.success) {
      const errEmail = validation.error.flatten().fieldErrors.email?.[0];
      const errPassword = validation.error.flatten().fieldErrors.password?.[0];
      const errRepeatPassword =
        validation.error.flatten().fieldErrors.repeatPassword?.[0];
      const errCheckBox = validation.error.flatten().fieldErrors.terms?.[0];
      if (errEmail) {
        setErrorEmail(errEmail);
      }
      if (errPassword) {
        setErrorPassword(errPassword);
      }
      if (errRepeatPassword) {
        setErrorRepeatPassword(errRepeatPassword);
      }
      if (errCheckBox) {
        setErrorTerms(errCheckBox);
      }

      return;
    }
    try {
      await signUp({
        email: validation.data.email,
        password: validation.data.password,
      }).unwrap();

      setEmail('');
      setPassword('');
      setRepeatPassword('');
      setCheckBox(false);
    } catch (error) {
      if (error instanceof Error && 'status' in error && error.status === 422) {
        setErrorSignUp('Email already exists');
      } else {
        setErrorSignUp('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={fontStyles.headerMedium}>Create account</Text>
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <InputFieldText
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            placeholder="Email"
            type="email"
            keyboardType="email-address"
            errorMessage={message.target === 'email' ? message.message : null}
          />
          <ErrorMessage isInputField message={errorEmail} />
        </View>
        <View style={styles.inputContainer}>
          <InputFieldText
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            placeholder="Create password"
            type="password"
          />
          <ErrorMessage isInputField message={errorPassword} />
        </View>
        <View style={styles.inputContainer}>
          <InputFieldText
            value={repeatPassword}
            onChangeText={(text: string) => setRepeatPassword(text)}
            placeholder="Repeat password"
            type="password"
            errorMessage={
              message.target === 'password' ? message.message : null
            }
          />
          <ErrorMessage isInputField message={errorRepeatPassword} />
        </View>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={checkbox}
          onPress={() => setCheckBox(!checkbox)}
          style={errorTerms ? styles.alertBox : {}}
        />
        <Text style={fontStyles.bodySmall}>
          I agree to <Text style={styles.link}>terms & conditions</Text> and
          Lofft’s <Text style={styles.link}>privacy policy</Text>.
        </Text>
      </View>
      <View style={styles.signUpContainer}>
        <CoreButton
          value={isLoading ? '' : 'Sign Up'}
          icon={isLoading ? <LoadingButtonIcon /> : undefined}
          onPress={handleSignUp}
          disabled={isLoading}
        />
        <ErrorMessage message={errorSignUp || errorTerms} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: size(35),
    alignItems: 'center',
    flex: 1,
    gap: size(0),
  },

  titleContainer: {
    marginBottom: size(10),
  },

  inputsContainer: {
    width: '100%',
    gap: size(5),
  },
  inputContainer: {},

  checkBoxContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(20),
    marginTop: size(0),
  },

  signUpContainer: {
    width: '100%',
    gap: size(0),
    marginTop: size(10),
    zIndex: 10,
  },
  link: {
    color: Color.Blue['100'],
  },
  alertBox: {
    borderColor: Color.Tomato[100],
    backgroundColor: Color.Tomato[30],
  },
});

export default SignUpForm;
