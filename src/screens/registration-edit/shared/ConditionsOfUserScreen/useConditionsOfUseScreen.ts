import {useState} from 'react';

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

// Types
import {RootStackNavigationProp} from 'navigationStacks/types';
import {
  NewUserLessorDetails,
  NewUserTenantDetails,
} from 'reduxFeatures/registration/types';
import {Messages} from 'reduxFeatures/settings/types';
import {UserType} from 'reduxFeatures/user/types';
export const useConditionsOfUseScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);

  //Redux
  const [signOut, {isLoading}] = useSignOutMutation();
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();

  const {savedImages} = useImagesToUpload();
  const {isNewUserLessor, newUserDetails, setNewUserDetails} =
    useNewUserDetails();

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

  const createNewUserError = (err: unknown) => {
    const typedError = err as {
      status?: number;
    };
    if (typedError.status === 422) {
      setErrorMessage(Messages.RequiredFields);
    } else {
      setErrorMessage(Messages.ErrorOccurred);
    }
  };

  console.log('newUserDetails token', newUserDetails.deviceToken);

  const handleNewUserJourneyCheckout = async () => {
    if (isNewUserLessor) {
      try {
        await handleGetDeviceToken();
        const mainFlatImage = savedImages.lessor.mainFlatImage;
        const flatImages = savedImages.lessor.flatImages;
        const flatImagesWithNoMainFlatImage = flatImages.filter(
          image => image.uri !== mainFlatImage?.uri,
        );

        const avatar = savedImages.lessor.avatar;
        const lessorProfileImages = savedImages.lessor.userImages;
        const lessorProfileImagesWithNoAvatar = lessorProfileImages.filter(
          image => image.uri !== avatar?.uri,
        );

        const result = await completeLessorAndCreateAdvert({
          id: currentUser?.id || 0,
          userChoices: newUserDetails as NewUserLessorDetails,
          flatImages: flatImagesWithNoMainFlatImage,
          mainFlatImage,
          lessorProfileImages: lessorProfileImagesWithNoAvatar,
          avatar,
        }).unwrap();
        setErrorMessage('');
        setIsNavigating(true);
        if (currentUser?.userType === UserType.LESSOR) {
          navigation.reset({
            index: 0,
            routes: [{name: 'LessorDashboardStack'}],
          });
        }

        console.log('Lessor successfully completed', result);
      } catch (error) {
        setIsNavigating(false);
        createNewUserError(error);
      }
    } else {
      try {
        const avatar = savedImages.tenant.avatar;
        const photos = savedImages.tenant.userImages;
        const photosWithNoAvatar = photos.filter(
          image => image.uri !== avatar?.uri,
        );
        await handleGetDeviceToken();
        const result = await completeUserAndCreateTenant({
          id: currentUser?.id || 0,
          userChoices: newUserDetails as NewUserTenantDetails,
          photos: photosWithNoAvatar,
          avatar,
        }).unwrap();
        setErrorMessage('');
        setIsNavigating(true);
        if (currentUser?.userType === UserType.TENANT) {
          navigation.reset({
            index: 0,
            routes: [{name: 'TenantDashboardStack'}],
          });
        }
        console.log('Tenent successfully completed', result);
      } catch (error) {
        setIsNavigating(false);
        createNewUserError(error);
      }
    }
  };

  return {
    handleBackButton,
    handleNewUserJourneyCheckout,
    handleSignOut,
    toggleModal,
    isModalOpen,
    setIsModalOpen,
    errorMessage,
    isNavigating,
    isLoading,
    isLoadingTenant,
    isLoadingLessor,
    isLoadingUser,
  };
};
