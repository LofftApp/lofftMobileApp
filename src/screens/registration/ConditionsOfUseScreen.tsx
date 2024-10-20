import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🏗️
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Screens 📺

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import {CoreButton} from 'components/buttons/CoreButton';
import BackButton from 'components/buttons/BackButton';
import {RegistrationBackground, Search} from 'assets';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ConfirmModal from 'components/modals/ConfirmModal';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Types
import {NewUserJourneyStackNavigation} from '../../navigationStacks/types';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

const ConditionsOfUseScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  //Redux
  const [signOut] = useSignOutMutation();
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {isLessor, newUserDetails} = useNewUserDetails();
  const {savedImages} = useImagesToUpload();

  const handleSignOut = () => {
    signOut();
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
  };

  const handleContinue = () => {
    setMessage(
      "Next step is to handle user's details and images. Take a look at the console.",
    );
    console.log(
      isLessor ? 'Lessor object 👽:' : 'Renter object 🧑‍🚀:',
      newUserDetails,
    );
    console.log('Images to upload 📸:', savedImages);
  };
  return (
    <>
      {isModalOpen && <View style={styles.overlay} />}
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        <View style={CoreStyleSheet.screenContainer}>
          <BackButton onPress={handleBackButton} />
          <RegistrationBackground
            height="100%"
            width="100%"
            style={CoreStyleSheet.backgroundImage}
          />
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
              {message && <ErrorMessage message={message} />}
              <NewUserPaginationBar />
              <NewUserJourneyContinueButton
                value="Agree and Continue"
                onPress={handleContinue}
              />

              <CoreButton value="Decline" invert onPress={toggleModal} />
            </View>
          </View>
          <ConfirmModal
            openModal={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalAsset={{
              header: 'Are you sure you want to decline?',
              description:
                'By declining you will be logged out and your progress will be lost.',
              buttonText: {
                first: 'Confirm decline',
                second: 'Take me back',
              },
            }}
            image={<Search />}
            onPressFirstButton={handleSignOut}
          />
        </View>
      </SafeAreaView>
    </>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.BlackOpacity[50],
    zIndex: 1,
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default ConditionsOfUseScreen;
