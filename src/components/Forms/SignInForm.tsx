import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Redux 🧠
import {useSignInMutation} from 'reduxFeatures/authentication/authApi';

// Components 🪢
import SignUpButton from 'components/buttons/SignUpButton';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({target: '', message: ''});
  const [signIn] = useSignInMutation();

  const handleSignIn = () => {
    signIn({email, password});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello again!</Text>
      <View style={styles.textInputWrap}>
        <InputFieldText
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          placeholder="Email"
          type="email"
          keyboardType="email-address"
          errorMessage={message?.target === 'email' ? message?.message : null}
        />
        <InputFieldText
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          placeholder="Password"
          type="password"
          errorMessage={
            message?.target === 'password' ? message?.message : null
          }
        />
        <Text style={styles.text}>Forgot password?</Text>
      </View>
      <View style={styles.signUpButtonView}>
        <SignUpButton title="Sign in" onPress={handleSignIn} />
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
