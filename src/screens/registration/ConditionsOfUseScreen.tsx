import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

// Redux 🏗️
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useCompleteUserAndCreateTenantMutation} from 'reduxFeatures/user/userApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useCompleteLessorAndCreateAdvertMutation} from 'reduxFeatures/adverts/advertApi';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import {CoreButton} from 'components/buttons/CoreButton';
import BackButton from 'components/buttons/BackButton';
import {Looking, RegistrationBackground} from 'assets';
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

//Components
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Types
import {RootStackNavigationProp} from '../../navigationStacks/types';
import {
  NewUserLessorDetails,
  NewUserTenantDetails,
} from 'reduxFeatures/registration/types';

const ConditionsOfUseScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);

  //Redux
  const [signOut, {isLoading}] = useSignOutMutation();
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();

  const {savedImages} = useImagesToUpload();

  const {isLessor, newUserDetails, setNewUserDetails} = useNewUserDetails();

  const [completeUserAndCreateTenant, {isLoading: isLoadingTenant}] =
    useCompleteUserAndCreateTenantMutation();
  const [completeLessorAndCreateAdvert, {isLoading: isLoadingLessor}] =
    useCompleteLessorAndCreateAdvertMutation();
  const {data: currentUser, isLoading: isLoadingUser} = useGetUserQuery();

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

  const handleGetDeviceToken = async () => {
    const token = await messaging().getToken();
    console.log('Token in conditionsScreen', token);
    setNewUserDetails({...newUserDetails, deviceToken: token});
  };

  console.log('newUserDetails token', newUserDetails.deviceToken);

  const handleNewUserJourneyCheckout = async () => {
    if (isLessor) {
      const flatImagesArray = savedImages.lessor.flatImages;
      const lessorProfileImagesArray = savedImages.lessor.userImages;
      handleGetDeviceToken();
      try {
        const result = await completeLessorAndCreateAdvert({
          id: currentUser?.id || 0,
          userChoices: newUserDetails as NewUserLessorDetails,
          flatImages: flatImagesArray,
          lessorProfileImages: lessorProfileImagesArray,
        }).unwrap();
        setErrorMessage('');
        setIsNavigating(true);
        if (currentUser?.userType === 'lessor') {
          navigation.reset({
            index: 0,
            routes: [{name: 'LessorDashboardStack'}],
          });
        }

        console.log('Lessor successfully completed', result);
      } catch (error) {
        setIsNavigating(false);
        const typedError = error as {
          status?: number;
        };
        if (typedError.status === 422) {
          setErrorMessage('Please fill out all the required fields');
        } else {
          setErrorMessage('An error occurred, please try again');
        }
      }
    } else {
      handleGetDeviceToken();
      try {
        const result = await completeUserAndCreateTenant({
          id: currentUser?.id || 0,
          userChoices: newUserDetails as NewUserTenantDetails,
          photos: savedImages.tenant.userImages,
        }).unwrap();
        setErrorMessage('');
        setIsNavigating(true);
        if (currentUser?.userType === 'tenant') {
          navigation.reset({
            index: 0,
            routes: [{name: 'TenantDashboardStack'}],
          });
        }
        console.log('Tenent successfully completed', result);
      } catch (error) {
        setIsNavigating(false);
        const typedError = error as {
          status?: number;
        };
        if (typedError.status === 422) {
          setErrorMessage('Please fill out all the required fields');
        } else {
          setErrorMessage('An error occurred, please try again');
        }
      }
    }
  };

  if (isNavigating || isLoadingTenant || isLoadingLessor || isLoadingUser) {
    return <LoadingComponent />;
  }

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
              <ErrorMessage message={errorMessage} />
              <Divider />
              <NewUserPaginationBar />
              <NewUserJourneyContinueButton
                value={isLoading ? <LoadingButtonIcon /> : 'Agree and Continue'}
                onPress={handleNewUserJourneyCheckout}
                disabled={isLoading}
              />

              <CoreButton
                value="Decline"
                invert
                onPress={toggleModal}
                disabled={isLoading}
              />
            </View>
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
          image={<Looking />}
          onPressFirstButton={handleSignOut}
        />
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
    marginTop: size(10),
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
    paddingBottom: size(10),
    gap: size(10),
  },
});

export default ConditionsOfUseScreen;
