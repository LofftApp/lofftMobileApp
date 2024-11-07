import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// RTK 🌎
import {useSignUpMutation} from 'reduxFeatures/auth/authApi';

// Components 🪢
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import {CoreButton} from 'components/buttons/CoreButton';

//Validation 🛡️
import {signUpSchema} from 'lib/zodSchema';

// Stylesheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

//Helpers 🤝
import {size} from 'react-native-responsive-sizes';

const SignUpForm = () => {
  const [checkbox, setCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorRepeatPassword, setErrorRepeatPassword] = useState('');
  const [errorTerms, setErrorTerms] = useState('');
  const [errorSignUp, setErrorSignUp] = useState('');

  const [signUp, {isLoading}] = useSignUpMutation();

  const handleEmailChange = (input: string) => {
    setEmail(input);
    setErrorEmail('');
    setErrorSignUp('');
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    setErrorPassword('');
    setErrorRepeatPassword('');
    setErrorSignUp('');
  };

  const handleRepeatPasswordChange = (input: string) => {
    setRepeatPassword(input);
    setErrorRepeatPassword('');
    setErrorSignUp('');
  };

  const toggleCheckBox = () => {
    setCheckBox(prev => !prev);
    setErrorTerms('');
  };

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
      const typedError = error as {
        status?: number | 'FETCH_ERROR';
      };
      if (typedError.status === 422) {
        setErrorSignUp('User already exists. Please sign in');
      } else if (typedError.status === 'FETCH_ERROR') {
        setErrorSignUp('Network error. Please check connection or server');
      } else if (typedError.status === 403) {
        setErrorSignUp('Wrong tokens. Check environment variables');
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
            onChangeText={handleEmailChange}
            placeholder="Email"
            type="email"
            keyboardType="email-address"
            errorMessage={errorEmail || errorSignUp}
          />
          <ErrorMessage isInputField message={errorEmail} />
        </View>
        <View style={styles.inputContainer}>
          <InputFieldText
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Create password"
            type="password"
            errorMessage={errorPassword || errorSignUp}
          />
          <ErrorMessage isInputField message={errorPassword} />
        </View>
        <View style={styles.inputContainer}>
          <InputFieldText
            value={repeatPassword}
            onChangeText={handleRepeatPasswordChange}
            placeholder="Repeat password"
            type="password"
            errorMessage={errorRepeatPassword || errorSignUp}
          />
          <ErrorMessage isInputField message={errorRepeatPassword} />
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            value={checkbox}
            onPress={toggleCheckBox}
            style={errorTerms ? styles.alertBox : {}}
          />
          <Text style={fontStyles.bodySmall}>
            I agree to <Text style={styles.link}>terms & conditions</Text> and
            Lofft’s <Text style={styles.link}>privacy policy</Text>.
          </Text>
        </View>
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
  },

  titleContainer: {
    marginBottom: size(10),
  },

  inputsContainer: {
    width: '100%',
    gap: size(5),
  },
  inputContainer: {gap: size(3)},

  checkBoxContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(16),
    marginTop: size(-5),
    marginBottom: size(10),
    paddingHorizontal: size(5),
  },

  signUpContainer: {
    width: '100%',
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
