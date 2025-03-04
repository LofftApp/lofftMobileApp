import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {
  EditAdvertActions,
  EditFlatImageParams,
} from 'reduxFeatures/adverts/types';
import {useSelectImage} from 'hooks/useSelectImage';
import {
  useEditFlatImageMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {useManualPopover} from 'reduxFeatures/settings/useManualPopover';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useToast} from 'reduxFeatures/settings/useToast';

//Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Constants 📊
import {MAX_FLAT_IMAGES} from 'components/componentData/constants';

//Validation 🛡 ️
import {flatImagesSchema} from 'lib/zodSchema';

// Helpers
import {isEqualValue} from 'helpers/isEqualValue';
import {createEditError} from 'helpers/createEditError';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {
  ImageRecord,
  ImageToUpload,
  ImageType,
} from 'reduxFeatures/imageHandling/types';
import {UserType} from 'reduxFeatures/user/types';
import {Messages, PopoverKeys, ToastTypes} from 'reduxFeatures/settings/types';

export const useFlatImageUploadScreen = (edit: boolean, advertId: number) => {
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
  } = useImagesToUpload(ImageType.Flat);

  const {isNewUserLessor} = useNewUserDetails();
  const totalImages =
    imagesToUpload.length + savedImages.lessor.flatImages.length;

  const {
    data: advert,
    isLoading: isAdvertLoading,
    isError: isAdvertError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit || !advertId,
  });

  const {data: currentUser} = useGetUserQuery();

  const [
    editFlatImage,
    {isLoading: isEditFlatLoading, isError: isEditFlatError},
  ] = useEditFlatImageMutation();

  const dbImages = advert?.flat.mainPic
    ? [advert?.flat?.mainPic, ...(advert?.flat?.photos || [])]
    : advert?.flat?.photos || [];
  const mainSavedImage = savedImages.lessor.mainFlatImage;
  const displaySavedImages = savedImages.lessor.flatImages || [];

  const {currentSelectionRef} = useSelectImage({
    edit: edit ?? false,
    userType: UserType.LESSOR,
    imageType: ImageType.Flat,
    dbImages,
    displaySavedImages,
    mainFlatImage: mainSavedImage,
  });

  useEffect(() => {
    if (totalImages > MAX_FLAT_IMAGES) {
      setError(`You can only upload ${MAX_FLAT_IMAGES} images`);
    } else {
      setError('');
    }
  }, [totalImages]);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopover({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.EditFlatImage : PopoverKeys.FlatImage,
    });

  const {showToast} = useToast();

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setError('');
  };

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
    }

    navigation.goBack();
    setError('');
    clearImagesToUpload();
    setSelectedImage(null);
  };

  const handleContinue = async () => {
    const concatImages = [...imagesToUpload, ...savedImages.lessor.flatImages];

    const result = flatImagesSchema.safeParse(concatImages);

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

    const mainImage = concatImages.find(
      img => img.uri === selectedImage?.uri,
    ) as ImageRecord | ImageToUpload;

    if (!mainImage) {
      setError('Please select a valid main image.');
      return;
    }

    if (edit) {
      try {
        const imagesParams: EditFlatImageParams = {
          flatId: advert?.flat.id ?? 0,
          actionMethod: EditAdvertActions.Images,
          data: {
            existingImages: filteredExistingImages,
            newImages,
            deletedImages: deletedIds,
            mainImage,
          },
        };

        await editFlatImage(imagesParams).unwrap();
        showToast({
          message: Messages.ChangesSaved,
          type: ToastTypes.Success,
        });
        navigation.goBack();
        clearImagesToUpload();
        setSelectedImage(null);
      } catch (err) {
        createEditError(err, setError);
        return;
      }
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
      setTimeout(() => {
        setSavedImages({
          userType: UserType.LESSOR,
          imageType: ImageType.Flat,
          images: result.data,
          avatar: null,
          mainFlatImage: mainImage ?? null,
        });
        clearImagesToUpload();
      }, 1000);
    }

    setError('');
  };

  return {
    isModalOpen,
    toggleModal,
    error,
    handleBackButton,
    handleContinue,
    isAdvertLoading,
    isEditFlatLoading,
    isAdvertError,
    isEditFlatError,
    totalImages,
    setIsModalOpen,
    showPopover,
    setShowPopover,
  };
};
