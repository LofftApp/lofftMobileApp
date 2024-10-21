import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';

// Components 🪢
import SignInForm from 'components/Forms/SignInForm';
import SignInWith from 'components/containers/SignInWith';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Assets 🛠️
import {SignInBackground} from '../../assets';
import {HiFive} from '../../assets';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {size} from 'react-native-responsive-sizes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SignInScreen = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <SignInBackground
        height="200%"
        width="100%"
        style={styles.backgroundImage}
      />
      <View style={styles.imageContainer}>
        <HiFive style={styles.image} />
      </View>

      <View style={[styles.formWrap, {paddingBottom: insets.bottom}]}>
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
  backgroundImage: {
    position: 'absolute',
    top: '-46%',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Color.Lavendar['10'],
  },
  image: {
    marginTop: size(20),
  },
  imageContainer: {
    zIndex: 3,
    flex: 1,
    alignItems: 'center',
  },
  formWrap: {
    flex: 3,
    paddingHorizontal: size(16),
    backgroundColor: Color.White['100'],
    borderRadius: 30,
    zIndex: 2,
  },
  signInForm: {
    flex: 2,
  },
  signInWith: {
    flex: 1,
    alignItems: 'center',
    marginBottom: size(40),
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  link: {
    color: Color.Blue['100'],
  },
});

export default SignInScreen;
