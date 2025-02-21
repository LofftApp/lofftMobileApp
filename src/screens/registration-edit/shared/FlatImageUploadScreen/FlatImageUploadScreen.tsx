import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

// Hooks 🪝
import {useFlatImageUploadScreen} from './useFlatImageUploadScreen';

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
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

//Helpers 🤝
import {size} from 'react-native-responsive-sizes';

//Styles 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Constants 📊
import {MAX_FLAT_IMAGES} from 'components/componentData/constants';

//Types 🏷️

import {ImageType} from 'reduxFeatures/imageHandling/types';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import OpacityOverlay from 'components/modals/OpacityOverlay';

const FlatImageUploadScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;

  const {
    isModalOpen,
    toggleModal,
    error,
    handleBackButton,
    handleContinue,
    fadeInAnim,
    isAdvertLoading,
    isEditFlatLoading,
    isAdvertError,
    isEditFlatError,
    totalImages,
    showPopover,
    setShowPopover,
    setIsModalOpen,
  } = useFlatImageUploadScreen(edit, advertId);

  if (isAdvertLoading) {
    return <LoadingComponent />;
  }

  if (isAdvertError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }
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
          fadeAnim={fadeInAnim}
          error={error}
          imageType={ImageType.Flat}
        />
        <View style={styles.footerContainer}>
          <Divider />
          {(error || isEditFlatError) && <ErrorMessage message={error} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={edit ? 'Save' : 'Continue'}
            disabled={totalImages > MAX_FLAT_IMAGES || isEditFlatLoading}
            onPress={handleContinue}
          />
        </View>
      </View>
      <UploadImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <NewUserScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
      />
      <OpacityOverlay loadingState={isEditFlatLoading} />
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
