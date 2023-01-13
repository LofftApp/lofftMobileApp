import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// API 🧠
import {handleSignUp} from '@Firebase/firebaseAuth';

// Components 🪢
import SignUpButton from '@Components/buttons/SignUpButton';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import CheckBox from '@Components/coreComponents/interactiveElements/CheckBox';
import {CoreButton} from '@Components/buttons/CoreButton';

// Stylesheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

const SignUpForm = () => {
  const [checkbox, setCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState({target: null, message: null});

  const pageValidation = (
    checkbox: boolean,
    password: string,
    repeatPassword: string,
  ) => {
    if (checkbox === false) {
      return {
        error: true,
        target: 'checkBox',
        message: 'Please agree to our terms & conditions and privacy policy',
      };
    } else if (password === '') {
      return {
        error: true,
        target: 'password',
        message: 'Please enter a valid password',
      };
    } else if (password !== repeatPassword) {
      return {
        error: true,
        target: 'password',
        message: 'Your passwords do not match!',
      };
    }
    return {error: false};
  };

  const submitValidation = async ({email, password}: any) => {
    let validation: any = null;
    validation = pageValidation(checkbox, password, repeatPassword);
    setMessage(validation);
    if (!validation.error) {
      validation = await handleSignUp({email, password});
      if (validation?.error) {
        setMessage(validation);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.textInputWrap}>
        <InputFieldText
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          placeholder="Email"
          type="email"
          keyboardType="email-address"
          errorMessage={message.target === 'email' ? message.message : null}
        />
        <InputFieldText
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          placeholder="Create password"
          type="password"
        />
        <InputFieldText
          value={repeatPassword}
          onChangeText={(text: string) => setRepeatPassword(text)}
          placeholder="Repeat password"
          type="password"
          errorMessage={message.target === 'password' ? message.message : null}
        />
        <View style={styles.checkBoxWrap}>
          <CheckBox
            value={checkbox}
            onPress={() => setCheckBox(!checkbox)}
            style={message.target === 'checkBox' ? styles.alertBox : null}
          />
          <Text style={styles.text}>
            I agree to <Text style={styles.link}>terms & conditions</Text> and
            Lofft’s <Text style={styles.link}>privacy policy</Text>.
          </Text>
        </View>
      </View>
      <View style={styles.signUpButtonView}>
        <SignUpButton
          title="Sign up"
          onPress={() => submitValidation({email, password})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    paddingBottom: 20,
  },
  textInputWrap: {
    width: '100%',
    borderColor: 'black',
  },
  text: {
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  checkBoxWrap: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  signUpButtonView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
