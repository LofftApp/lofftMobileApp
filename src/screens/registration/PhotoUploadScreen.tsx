import {useNavigation} from '@react-navigation/native';
import {RegistrationBackground} from 'assets';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import {newUserScreens} from 'components/componentData/newUserScreens';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import UploadImageModal from 'components/modals/UploadImageModal';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePreviewRow from 'components/imageUpload/ImagePreviewRow';
import UploadImageButton from 'components/imageUpload/UploadImageButton';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {MAX_FLAT_IMAGES} from 'components/componentData/constants';

const PhotoUploadScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {newUserDetails, setNewUserDetails, isLessor} = useNewUserDetails();
  const {imagesToUpload} = useImagesToUpload();
  const totalImages = imagesToUpload.length;

  useEffect(() => {
    if (totalImages > MAX_FLAT_IMAGES) {
      setError(`You can only upload ${MAX_FLAT_IMAGES} images`);
    }
  }, [totalImages]);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };
  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
  };

  const handleContinue = () => {
    if (totalImages < 1) {
      setError('Please upload at least one image');
      return;
    }
    if (totalImages > MAX_FLAT_IMAGES) {
      setError(`You can only upload ${MAX_FLAT_IMAGES} images`);
      return;
    }
    setCurrentScreen(currentScreen + 1);
    const screen = isLessor
      ? newUserScreens.lessor[currentScreen + 1]
      : newUserScreens.renter[currentScreen + 1];
    navigation.navigate(screen);

    setError('');
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
            isLessor ? 'Upload images of your flat' : 'Upload pictures of you'
          }
          subDescription={
            isLessor
              ? 'Time to show off your space! The more images, more chances of getting a match!'
              : 'Show off your best self! The more images, more chances of getting a match!'
          }
        />
        <View style={styles.mainContainer}>
          <ScrollView>
            <View style={styles.imageContainer}>
              <UploadImageButton onPress={toggleModal} />
              <ImagePreviewRow />
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <Divider />
            <ErrorMessage message={error} />
            <NewUserPaginationBar />
            <NewUserJourneyContinueButton
              value="Continue"
              disabled={totalImages < 1 || totalImages > MAX_FLAT_IMAGES}
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
  imageContainer: {
    flex: 1,
    gap: size(20),
    marginTop: size(10),
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default PhotoUploadScreen;
