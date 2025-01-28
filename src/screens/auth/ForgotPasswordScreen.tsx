import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Assets 🛠️
import {SignInBackground} from '../../assets';
import {Heart} from '../../assets';

// Helpers 🥷  🏻
import {size} from 'react-native-responsive-sizes';

//Types  🧩
import {GuestStackScreenNavigationProp} from 'navigationStacks/types';
import ResetForm from 'components/Forms/ResetForm';
import BackButton from 'components/buttons/BackButton';
const {height} = Dimensions.get('window');

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<GuestStackScreenNavigationProp>();

  const insets = useSafeAreaInsets();
  const imageMarginTop = height < 700 ? size(10) : size(20);
  const [clearErrors, setClearErrors] = useState(false);

  return (
    <View testID="sign-in" style={styles.behindContainer}>
      <BackButton
        style={styles.backButton}
        neutral={true}
        onPress={() => navigation.goBack()}
      />
      <SignInBackground
        height={height * 1.9}
        width="100%"
        style={styles.backgroundImage}
      />

      <View style={styles.imageContainer}>
        <Heart style={{marginTop: imageMarginTop}} />
      </View>

      <View style={[styles.formContainer, {paddingBottom: insets.bottom}]}>
        <View style={styles.signInForm}>
          <ResetForm
            clearErrors={clearErrors}
            setClearErrors={setClearErrors}
          />
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
  backButton: {
    position: 'absolute',
    top: 40,
    zIndex: 5000,
  },
  rocket: {
    height: 20,
    width: 20,
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
    backgroundColor: Color.White['100'],
    borderRadius: 30,
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
    flexDirection: 'row',
    padding: 10,
  },
});

export default ForgotPasswordScreen;
