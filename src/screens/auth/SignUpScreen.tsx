import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

// Components 🪢
import SignUpForm from 'components/Forms/SignUpForm';
import SignInWith from 'components/containers/SignInWith';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Assets 🛠️
import {Search} from '../../assets';
import {SignUpBackground} from '../../assets';
import {size} from 'react-native-responsive-sizes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fontStyles} from 'styleSheets/fontStyles';
import {GuestStackScreenNavigationProp} from 'navigationStacks/types';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation<GuestStackScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const handleSignIn = () => {
    navigation.navigate('SignInScreen');
  };
  return (
    <View style={styles.behindContainer}>
      <SignUpBackground
        height="200%"
        width="100%"
        style={styles.backgroundImage}
      />
      <View style={styles.imageContainer}>
        <Search style={styles.image} />
      </View>

      <View style={[styles.formContainer, {paddingBottom: insets.bottom}]}>
        <View style={styles.signUpForm}>
          <SignUpForm />
        </View>
        <View style={styles.signInWithContainer}>
          <SignInWith />
          <View style={styles.signInContainer}>
            <Text style={fontStyles.bodyMedium}>Already have an account ?</Text>
            <Text
              style={[fontStyles.bodyMedium, {color: Color.Blue['100']}]}
              onPress={handleSignIn}>
              Sign In
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  behindContainer: {
    flex: 1,
    backgroundColor: Color.Lavendar['10'],
  },

  backgroundImage: {
    position: 'absolute',
    top: '-46%',
    zIndex: 1,
  },

  imageContainer: {
    zIndex: 3,
    flex: 1,
    alignItems: 'center',
    marginTop: size(0),
  },
  formContainer: {
    flex: 3,
    paddingHorizontal: size(16),
    backgroundColor: Color.White['100'],
    borderRadius: 30,
    zIndex: 2,
  },

  signInWithContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: size(120),
  },

  image: {
    marginTop: size(-60),
  },
  signInContainer: {
    flexDirection: 'row',
    gap: size(30),
    alignItems: 'center',
    marginBottom: size(20),
  },

  container: {
    flex: 1,
    backgroundColor: Color.Lavendar['5'],
  },
  imageWrap: {
    // paddingTop: 130,
    zIndex: 3,
    flex: 1,
    alignItems: 'center',
  },

  formWrap: {
    flex: 3,
    zIndex: 2,
    paddingHorizontal: 10,
    backgroundColor: Color.White['100'],
    borderRadius: 30,
  },
  signUpForm: {
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

export default SignUpScreen;
