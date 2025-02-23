import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {
  useEditProfileImageMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';
import {useSelectImage} from 'hooks/useSelectImage';
import {
  EditProfileActions,
  EditProfileImageParams,
  UserType,
} from 'reduxFeatures/user/types';

//Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Constants 📊
import {MAX_USER_IMAGES} from 'components/componentData/constants';

//Validation 🛡 ️
import {userImagesSchema} from 'lib/zodSchema';

//Helpers 🤝
import {isEqualValue} from 'helpers/isEqualValue';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {
  ImageRecord,
  ImageToUpload,
  ImageType,
} from 'reduxFeatures/imageHandling/types';
import {PopoverKeys} from 'reduxFeatures/settings/types';

export const useUserImageUploadScreen = (edit: boolean) => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {
    imagesToUpload,
    clearImagesToUpload,
    setSavedImages,
    savedImages,
    deletedRecordImages,
    selectedImage,
    setSelectedImage,
  } = useImagesToUpload(ImageType.User);

  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails();

  const {
    data: currentUser,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetUserQuery();

  const [
    editUserProfile,
    {isLoading: isEditProfileLoading, isError: isEditProfileError},
  ] = useEditProfileImageMutation();

  const totalImages =
    isNewUserLessor || isLessor
      ? imagesToUpload.length + savedImages.lessor.userImages.length
      : imagesToUpload.length + savedImages.tenant.userImages.length;

  const dbImages = currentUser?.profile?.avatar
    ? [
        currentUser?.profile?.avatar,
        ...(currentUser?.profile?.userPhotos || []),
      ]
    : currentUser?.profile?.userPhotos || [];

  console.log('dbImages in profile', dbImages);

  const displaySavedImages =
    isLessor || isNewUserLessor
      ? savedImages.lessor.userImages
      : savedImages.tenant.userImages;

  const avatar =
    isNewUserLessor || isLessor
      ? savedImages.lessor.avatar
      : savedImages.tenant.avatar;

  const {currentSelectionRef} = useSelectImage({
    edit: edit ?? false,
    userType: isLessor || isNewUserLessor ? UserType.LESSOR : UserType.TENANT,
    imageType: ImageType.User,
    dbImages,
    displaySavedImages,
    avatar,
  });

  useEffect(() => {
    if (totalImages > MAX_USER_IMAGES) {
      setError(`You can only upload ${MAX_USER_IMAGES} images`);
    } else {
      setError('');
    }
  }, [totalImages]);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.EditProfileImage : PopoverKeys.ProfileImage,
    });

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setError('');
  };
  console.log('SelectedImage in use', selectedImage);
  console.log('CurrentSelectionRef in use', currentSelectionRef);
  console.log('displaySavedImages', displaySavedImages);
  console.log('dbImages', dbImages);
  console.log('savedImages', savedImages);
  console.log('imagesToUpload', imagesToUpload);

  const isNotAllEqual = () => {
    return (
      imagesToUpload.length > 0 ||
      !isEqualValue(
        selectedImage?.uri ? selectedImage?.uri : selectedImage,
        currentSelectionRef.current,
      )
    );
  };

  const handleBackButton = () => {
    if (!hasShownPopover && isNotAllEqual()) {
      triggerPopover();
      return;
    }

    if (edit) {
      setCurrentScreen(currentScreen - 1);
      setSelectedImage(null);
    }

    navigation.goBack();
    setError('');
    clearImagesToUpload();
  };

  const createError = (err: unknown) => {
    const typedError = err as {
      status?: number;
    };
    if (typedError.status === 422) {
      setError('We could not save your changes, please try again');
    } else {
      setError('An error occurred, please try again');
    }
  };

  const handleContinue = async () => {
    const concatImages =
      isNewUserLessor || isLessor
        ? [...imagesToUpload, ...savedImages.lessor.userImages]
        : [...imagesToUpload, ...savedImages.tenant.userImages];
    console.log('concatImages', concatImages);
    const result = userImagesSchema.safeParse(concatImages);
    console.log('Result', result);

    if (!result.success) {
      const err = result.error.errors[0].message;
      setError(err);
      return;
    }

    const newImages = imagesToUpload.filter(
      img => img.uri !== selectedImage?.uri,
    );

    const filteredExistingImages = displaySavedImages.filter(
      img => img.uri !== selectedImage?.uri,
    ) as ImageRecord[];

    const deletedIds = deletedRecordImages.map(img => img.blobId);

    const findMainImage = concatImages.find(
      img => img.uri === selectedImage?.uri,
    );

    const mainImage = concatImages.find(
      img => img.uri === selectedImage?.uri,
    ) as ImageRecord | ImageToUpload;

    if (!mainImage) {
      setError('Please select a valid main image.');
      return;
    }

    if (edit) {
      try {
        const imagesParams: EditProfileImageParams<
          UserType.LESSOR | UserType.TENANT
        > = {
          userId: currentUser?.id ?? 0,
          actionMethod: EditProfileActions.images,
          userType:
            isLessor || isNewUserLessor ? UserType.LESSOR : UserType.TENANT,
          data: {
            existingImages: filteredExistingImages,
            newImages,
            deletedImages: deletedIds,
            mainImage,
          },
        };
        console.log('imagesProfilesParams', imagesParams);
        await editUserProfile(imagesParams).unwrap();
        navigation.goBack();

        clearImagesToUpload();
        setSelectedImage(null);
      } catch (err) {
        createError(err);
        return;
      }
    } else {
      setCurrentScreen(currentScreen + 1);
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setTimeout(() => {
        setSavedImages({
          userType:
            isNewUserLessor || isLessor ? UserType.LESSOR : UserType.TENANT,
          imageType: ImageType.User,
          images: result.data,
          avatar: findMainImage ?? null,
          mainFlatImage: null,
        });
        clearImagesToUpload();
      }, 1000);
    }
    setError('');
  };

  return {
    isModalOpen,
    setIsModalOpen,
    toggleModal,
    error,
    handleBackButton,
    handleContinue,
    totalImages,
    setError,
    isEditProfileLoading,
    isEditProfileError,
    showPopover,
    setShowPopover,
    isProfileLoading,
    isProfileError,
  };
};
