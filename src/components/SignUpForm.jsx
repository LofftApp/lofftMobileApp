import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '../styles/lofftColorPallet.json';
import SignUpButton from './coreComponents/buttons/SignUpButton';
import InputFieldText from '../components/coreComponents/inputField/InputFieldText';
import CheckBox from '../components/coreComponents/interactiveElements/CheckBox';

const SignUpForm = () => {
  const [checkbox, setCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials) => {
      const user = userCredentials.user;
      console.log(user.email);
   }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.textInputWrap}>
        <InputFieldText
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          type="email"
        />
        <InputFieldText
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Create password"
          type="password"
        />
        <InputFieldText
          value={repeatPassword}
          onChangeText={text => setRepeatPassword(text)}
          placeholder="Repeat password"
          type="password"
        />
        <View style={styles.checkBoxWrap}>
          <CheckBox value={checkbox} onPress={() => setCheckBox(!checkbox)} />
          <Text style={styles.text}>
            I agree to terms & conditions and Lofft’s privacy policy.
          </Text>
        </View>
      </View>
      <View style={styles.signUpButtonView}>
        <SignUpButton props="Sign up"></SignUpButton>
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
    fontSize: 14,
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
});

export default SignUpForm;
0;
