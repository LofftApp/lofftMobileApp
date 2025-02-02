import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';

//Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Components 🪢
import {RegistrationBackground} from 'assets';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import UploadImageModal from 'components/modals/UploadImageModal';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import UploadImageSection from 'components/imageUpload/UploadImageSection';

//Helpers 🤝
import {size} from 'react-native-responsive-sizes';

//Styles 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Constants 📊
import {MAX_FLAT_IMAGES} from 'components/componentData/constants';

//Validation 🛡 ️
import {flatImagesSchema} from 'lib/zodSchema';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';

const FlatImageUploadScreen = ({route}: {route: {params: {edit: boolean}}}) => {
  const edit = route?.params?.edit;
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {imagesToUpload, clearImagesToUpload, setSavedImages, savedImages} =
    useImagesToUpload();
  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails(isLessor);
  const totalImages =
    imagesToUpload.length + savedImages.lessor.flatImages.length;

  useEffect(() => {
    if (savedImages.lessor.flatImages.length > 0) {
      setSavedImages({
        userType: 'lessor',
        imageType: 'flat',
        images: savedImages.lessor.flatImages,
      });
    }
  }, [savedImages.lessor.flatImages, setSavedImages]);

  useEffect(() => {
    if (totalImages > MAX_FLAT_IMAGES) {
      setError(`You can only upload ${MAX_FLAT_IMAGES} images`);
    } else {
      setError('');
    }
  }, [totalImages]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  });

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setError('');
  };
  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
    clearImagesToUpload();
  };

  const handleContinue = () => {
    const concatImages = [...imagesToUpload, ...savedImages.lessor.flatImages];
    const result = flatImagesSchema.safeParse(concatImages);

    if (!result.success) {
      const err = result.error.flatten().formErrors?.[0];
      setError(err);
      return;
    }

    if (edit) {
      navigation.goBack();
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
    }

    setError('');
    setTimeout(() => {
      setSavedImages({
        userType: 'lessor',
        imageType: 'flat',
        images: result.data,
      });
      clearImagesToUpload();
    }, 1000);
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
          headlineText={'Upload images of your flat'}
          subDescription={
            'Time to show off your space! The more images, more chances of getting a match!'
          }
        />
        <UploadImageSection
          toggleModal={toggleModal}
          fadeAnim={fadeAnim}
          error={error}
          imageType="flat"
        />
        <View style={styles.footerContainer}>
          <Divider />
          {error && <ErrorMessage message={error} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={edit ? 'Save' : 'Continue'}
            disabled={totalImages > MAX_FLAT_IMAGES}
            onPress={handleContinue}
          />
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
    paddingHorizontal: size(10),
  },
  footerContainer: {
    gap: size(10),
  },
});

export default FlatImageUploadScreen;
