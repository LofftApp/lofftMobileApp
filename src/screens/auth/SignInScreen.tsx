import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Components 🪢
import SignInForm from 'components/Forms/SignInForm';
import SignInWith from 'components/containers/SignInWith';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Assets 🛠️
import {SignInBackground} from '../../assets';
import {HiFive} from '../../assets';

// Helpers 🥷  🏻
import {size} from 'react-native-responsive-sizes';
//Types  🧩
import {GuestStackScreenNavigationProp} from 'navigationStacks/types';

const SignInScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<GuestStackScreenNavigationProp>();
  return (
    <View style={styles.behindContainer}>
      <SignInBackground
        height="200%"
        width="100%"
        style={styles.backgroundImage}
      />
      <View style={styles.imageContainer}>
        <HiFive style={styles.image} />
      </View>

      <View style={[styles.formContainer, {paddingBottom: insets.bottom}]}>
        <View style={styles.signInForm}>
          <SignInForm />
        </View>
        <View style={styles.signInWithContainer}>
          <SignInWith />
          <View style={styles.signUpContainer}>
            <Text style={fontStyles.bodyMedium}>
              Don't have an account yet?
            </Text>
            <Text
              style={[fontStyles.bodyMedium, {color: Color.Blue['100']}]}
              onPress={() => navigation.navigate('SignUpScreen')}>
              Sign Up
            </Text>
          </View>
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
  behindContainer: {
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
  formContainer: {
    flex: 3,
    paddingHorizontal: size(16),
    backgroundColor: Color.White['100'],
    borderRadius: 30,
    zIndex: 2,
  },
  signInForm: {
    flex: 2,
  },
  signInWithContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: size(40),
  },
  signUpContainer: {
    flexDirection: 'row',
    gap: size(30),
    alignItems: 'center',
  },
});

export default SignInScreen;
