import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '../../styles/lofftColorPallet.json';
import SignUpButton from '../buttons/SignUpButton';
import InputFieldText from '../coreComponents/inputField/InputFieldText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async () => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setMessage('That email address is invalid!');
      }
      if (err.code === 'auth/user-disabled') {
        setMessage('This user account is disabled!');
      }
      if (err.code === 'auth/user-not-found') {
        setMessage('This user cannot be found!');
      }
      if (err.code === 'auth/wrong-password') {
        setMessage('Incorrect password!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello again!</Text>
      <View style={styles.textInputWrap}>
        <InputFieldText
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          type="email"
          keyboardType="email-address"
          errorMessage={message}
        />
        <InputFieldText
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          type="password"
          errorMessage={message}
        />
        <Text style={styles.text}>Forgot password?</Text>
      </View>
      <View style={styles.signUpButtonView}>
        <TouchableOpacity onPress={handleSignIn}>
          <SignUpButton title="Sign in"></SignUpButton>
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
    fontSize: 16,
    paddingTop: 15,
    paddingHorizontal: 10,
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: Color.Blue['100'],
  },
  signUpButtonView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default SignInForm;
0;
