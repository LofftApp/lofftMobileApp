import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '../styles/lofftColorPallet.json';
import SignUpButton from './coreComponents/buttons/SignUpButton';
import InputFieldText from '../components/coreComponents/inputField/InputFieldText';
import CheckBox from '../components/coreComponents/interactiveElements/CheckBox';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const SignUpForm = () => {
  const [checkbox, setCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      if (password === repeatPassword && checkbox === true) {
        const newUser = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
      }
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setMessage('That email address is invalid!');
      }
      if (err.code === 'auth/email-already-in-use') {
        setMessage('That email address is already in use!');
      }
      if (err.code === 'auth/weak-password') {
        setMessage('The password is not strong enough');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.textInputWrap}>
        <InputFieldText
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          type="email"
          errorMessage={message}
        />
        <InputFieldText
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Create password"
          type="password"
          errorMessage={message}
        />
        <InputFieldText
          value={repeatPassword}
          onChangeText={text => setRepeatPassword(text)}
          placeholder="Repeat password"
          type="password"
          errorMessage={message}
        />
        <View style={styles.checkBoxWrap}>
          <CheckBox value={checkbox} onPress={() => setCheckBox(!checkbox)} />
          <Text style={styles.text}>
            I agree to <Text style={styles.link}>terms & conditions</Text> and
            Lofft’s <Text style={styles.link}>privacy policy</Text>.
          </Text>
        </View>
      </View>
      <View style={styles.signUpButtonView}>
        <TouchableOpacity onPress={handleSignUp}>
          <SignUpButton title="Sign up"></SignUpButton>
        </TouchableOpacity>
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
});

export default SignUpForm;
0;
