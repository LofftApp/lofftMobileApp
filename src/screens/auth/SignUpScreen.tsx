import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Components 🪢
import SignUpForm from 'components/Forms/SignUpForm';
import SignInWith from 'components/containers/SignInWith';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Assets 🛠️
import {Search} from '../../assets';
import {SignUpBackground} from '../../assets';

//Helpers
import {size} from 'react-native-responsive-sizes';

//Types  🧩
import {GuestStackScreenNavigationProp} from 'navigationStacks/types';

const {height} = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation<GuestStackScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const handleSignIn = () => {
    navigation.navigate('SignInScreen');
  };
  return (
    <View style={styles.behindContainer}>
      <SignUpBackground
        height={height * 1.9}
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
    marginTop: size(150),
  },

  image: {
    marginTop: size(height / 500),
  },
  signInContainer: {
    flexDirection: 'row',
    gap: size(30),
    alignItems: 'center',
    marginBottom: size(20),
  },

  signUpForm: {
    flex: 2,
  },
});

export default SignUpScreen;
