import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

// Components 🪢
import SignInForm from 'components/Forms/SignInForm';
import SignInWith from 'components/SignInWith';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Assets 🛠️
import {SignInBackground} from '../../assets';
import {HiFive} from '../../assets';

const SignInScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <HiFive style={styles.image} />
      </View>
      <SignInBackground style={styles.backgroundImage} />
      <View style={styles.formWrap}>
        <View style={styles.signInForm}>
          <SignInForm />
        </View>
        <View style={styles.signInWith}>
          <SignInWith navigation={navigation} />
          <Text style={styles.text}>
            Don't have an account yet?{'     '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('SignUpScreen')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Lavendar['5'],
  },
  image: {
    height: '70%',
    overflow: 'visible',
    marginTop: 50,
  },
  imageWrap: {
    zIndex: 3,
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: -10,
    zIndex: 1,
  },
  formWrap: {
    zIndex: 2,
    flex: 3,
    paddingHorizontal: 10,
    backgroundColor: Color.White['100'],
    borderRadius: 30,
  },
  signInForm: {
    flex: 2,
  },
  signInWith: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    paddingBottom: 40,
    fontSize: 16,
    fontWeight: '500',
  },
  link: {
    color: Color.Blue['100'],
  },
});

export default SignInScreen;
