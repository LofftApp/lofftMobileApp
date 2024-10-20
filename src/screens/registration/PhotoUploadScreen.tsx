import {useNavigation} from '@react-navigation/native';
import {RegistrationBackground} from 'assets';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import {newUserScreens} from 'components/componentData/newUserScreens';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import UploadImageModal from 'components/modals/UploadImageModal';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePreviewRow from 'reduxFeatures/imageHandling/ImagePreviewRow';
import UploadImageButton from 'reduxFeatures/imageHandling/UploadImageButton';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

const PhotoUploadScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {newUserDetails, setNewUserDetails, isLessor} = useNewUserDetails();

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };
  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
  };

  const handleContinue = () => {
    setCurrentScreen(currentScreen + 1);
    const screen = isLessor
      ? newUserScreens.lessor[currentScreen + 1]
      : newUserScreens.renter[currentScreen + 1];
    navigation.navigate(screen);
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
          headlineText={
            isLessor ? 'Upload Flat Photos' : 'Upload Profile Photo'
          }
        />
        <View style={styles.mainContainer}>
          <UploadImageButton onPress={toggleModal} />
          <ImagePreviewRow />
          <View style={styles.footerContainer}>
            <Divider />
            <NewUserPaginationBar />
            <NewUserJourneyContinueButton
              value="Continue"
              // disabled={text.length < MIN_DESCRIPTION_CHARS}
              onPress={handleContinue}
            />
          </View>
        </View>
      </View>
      <UploadImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default PhotoUploadScreen;
