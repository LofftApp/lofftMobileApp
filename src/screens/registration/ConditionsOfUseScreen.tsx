import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🏗️
import {useAppDispatch} from 'reduxCore/hooks';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import {CoreButton} from 'components/buttons/CoreButton';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Types
import {NewUserJourneyStackNavigation} from '../../navigationStacks/types';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {RegistrationBackground} from 'assets';
import BackButton from 'components/buttons/BackButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';

const ConditionsOfUseScreen = () => {
  const dispatch = useAppDispatch();
  const [signOut] = useSignOutMutation();
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const handleSignOut = () => {
    signOut();
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
  };

  const handleContinue = () => {
    console.log('Continue');
  };
  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={`Lofft is an ${'\n'}inclusive space`}
          subDescription="Lofft is an inclusive place for everyone to be. We exist to include
            and not divide."
        />
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={[fontStyles.bodySmall, {color: Color.Black[80]}]}>
              Therefore, we ask our members to agree to the statement below:
            </Text>
            <Text style={fontStyles.bodySmall}>
              “I agree to treat others in the Lofft community with respect. I
              agree to not discriminate, have judgment or bias of others based
              on their sex, race, religion, disability, language, gender
              identity, sexual orentation, national origin, age, ethnicity,
              political or any other opinion."
            </Text>
          </View>

          <View style={styles.footerContainer}>
            <Divider />
            <NewUserPaginationBar />
            <NewUserJourneyContinueButton
              value="Agree and Continue"
              onPress={handleContinue}
            />

            <CoreButton
              value="Decline"
              style={styles.buttonStyle}
              textStyle={[fontStyles.headerSmall, {color: Color.Lavendar[100]}]}
              disabled={false}
              onPress={handleSignOut}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: size(50),
    paddingHorizontal: size(10),
    gap: size(30),
  },

  descriptionText: {
    color: Color.Black[50],
    marginBottom: size(40),
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: size(2),
    marginTop: size(10),
  },
  options: {
    marginBottom: size(55),
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default ConditionsOfUseScreen;
