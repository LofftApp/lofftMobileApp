import React from 'react';
import {StyleSheet, View} from 'react-native';

// Hooks 🪝
import {useUserImageUploadScreen} from './useUserImageUploadScreen';

//Components 🪢
import {RegistrationBackground} from 'assets';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import UploadImageModal from 'components/modals/UploadImageModal';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import UploadImageSection from 'components/imageUpload/UploadImageSection';

//Helpers 🤝
import {size} from 'react-native-responsive-sizes';

//Styles 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Constants 📊
import {MAX_USER_IMAGES} from 'components/componentData/constants';

//Types 🏷️
import {ImageType} from 'reduxFeatures/imageHandling/types';
import OpacityOverlay from 'components/modals/OpacityOverlay';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const UserImageUploadScreen = ({
  route,
}: {
  route?: {params: {edit: boolean}};
}) => {
  const edit = route?.params?.edit || false;

  const {
    isModalOpen,
    toggleModal,
    setIsModalOpen,
    error,
    handleBackButton,
    handleContinue,
    totalImages,
    isEditProfileLoading,
    isEditProfileError,
    showPopover,
    setShowPopover,
    isProfileLoading,
    isProfileError,
  } = useUserImageUploadScreen(edit);

  const insets = useSafeAreaInsets();

  if (isProfileLoading) {
    return <LoadingComponent />;
  }

  if (isProfileError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the profile details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={'Upload pictures of you'}
          subDescription={
            'Show off your best self! The more images, more chances of getting a match!'
          }
        />
        <UploadImageSection
          imageType={ImageType.User}
          isReady={edit ? !isEditProfileLoading : undefined}
          error={error}
          toggleModal={toggleModal}
        />
        <View style={styles.footerContainer}>
          <Divider />
          {(error || isEditProfileError) && <ErrorMessage message={error} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={
              edit ? (
                isEditProfileLoading ? (
                  <LoadingButtonIcon />
                ) : (
                  'Save'
                )
              ) : (
                'Continue'
              )
            }
            disabled={totalImages > MAX_USER_IMAGES || isEditProfileLoading}
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
      <OpacityOverlay loadingState={isEditProfileLoading} />
    </View>
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

export default UserImageUploadScreen;
