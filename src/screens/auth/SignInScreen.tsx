import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Components 🪢
import SignInForm from 'components/Forms/SignInForm';
import SignInWith from 'components/containers/SignInWith';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPalletTest.json';

// Assets 🛠️
import {SignInBackground} from '../../assets';
import {HiFive} from '../../assets';

// Helpers 🥷  🏻
import {size} from 'react-native-responsive-sizes';

//Types  🧩
import {GuestStackScreenNavigationProp} from 'navigationStacks/types';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';
const {height} = Dimensions.get('window');

const SignInScreen = () => {
  const navigation = useNavigation<GuestStackScreenNavigationProp>();

  const {isDarkMode}: any = useTheme();
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;

  const insets = useSafeAreaInsets();
  const imageMarginTop = height < 700 ? size(10) : size(70);
  const [clearErrors, setClearErrors] = useState(false);

  const handleSignUp = () => {
    if (clearErrors) {
      setClearErrors(false);
      return;
    }

    navigation.navigate('SignUpScreen');
    setClearErrors(true);
  };

  const styles = StyleSheet.create({
  behindContainer: {
    flex: 1,
    backgroundColor: colors.Lavendar['10'],
  },
  backgroundImage: {
    position: 'absolute',
    top: '-46%',
    zIndex: 1,
  },
  image: {
    marginTop: height / 12,
  },
  imageContainer: {
    zIndex: 3,
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    flex: 3,
    paddingHorizontal: size(16),
    backgroundColor: colors.White['100'],
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 2,
  },
  signInForm: {
    flex: 2,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: size(190),
  },
  signUpContainer: {
    flexDirection: 'row',
    gap: size(20),
    alignItems: 'center',
    marginBottom: size(10),
  },
});

  return (
    <View testID="sign-in" style={styles.behindContainer}>
      <SignInBackground
        height={height * 1.9}
        width="100%"
        style={styles.backgroundImage}
      />

      <View style={styles.imageContainer}>
        <HiFive style={{marginTop: imageMarginTop}} />
      </View>

      <View style={[styles.formContainer, {paddingBottom: insets.bottom}]}>
        <View style={styles.signInForm}>
          <SignInForm
            clearErrors={clearErrors}
            setClearErrors={setClearErrors}
          />
        </View>
        <View style={styles.footer}>
          <SignInWith isSignInScreen />
          <View style={styles.signUpContainer}>
            <Text style={fontStyles.bodyMedium}>
              Don't have an account yet?
            </Text>
            <Text
              style={[fontStyles.bodyMedium, {color: colors.Blue['100']}]}
              onPress={handleSignUp}>
              Sign Up
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};


export default SignInScreen;
