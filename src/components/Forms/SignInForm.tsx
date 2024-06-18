import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// API 🌎
import {useAppDispatch} from 'reduxCore/hooks';
import {signIn} from 'reduxFeatures/authentication/authenticationMiddleware';

// Components 🪢
import SignUpButton from 'components/buttons/SignUpButton';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message] = useState({target: '', message: ''});
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
        <SignUpButton
          title="Sign in"
          onPress={() => dispatch(signIn({email, password}))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: size(50),
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: size(22),
    fontWeight: '600',
    lineHeight: size(28),
    paddingVertical: size(30),
  },
  textInputWrap: {
    width: '100%',
    borderColor: 'black',
  },
  text: {
    fontSize: size(16),
    paddingTop: size(15),
    paddingHorizontal: size(10),
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
