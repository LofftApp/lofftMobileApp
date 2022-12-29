import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '@StyleSheets/lofftColorPallet.json';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import {handleSignIn} from '@Firebase/firebaseAuth';
import SignUpButton from '@Components/buttons/SignUpButton';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
          errorMessage={message}
        />
        <InputFieldText
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          placeholder="Password"
          type="password"
          errorMessage={message}
        />
        <Text style={styles.text}>Forgot password?</Text>
      </View>
      <View style={styles.signUpButtonView}>
        <SignUpButton
          title="Sign in"
          onPress={() =>
            console.log(handleSignIn({email, password, setMessage}))
          }
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
