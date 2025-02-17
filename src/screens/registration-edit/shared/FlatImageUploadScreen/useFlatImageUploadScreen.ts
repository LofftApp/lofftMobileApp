import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {EditAdvertActions, EditFlatParams} from 'reduxFeatures/adverts/types';
import {useSelectImage} from 'hooks/useSelectImage';
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';
import {
  useEditFlatMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {useUserType} from 'reduxFeatures/user/useUserType';

//Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Constants 📊
import {MAX_FLAT_IMAGES} from 'components/componentData/constants';

//Validation 🛡 ️
import {flatImagesSchema} from 'lib/zodSchema';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {
  ImageRecord,
  ImageToUpload,
  ImageType,
  NewImage,
} from 'reduxFeatures/imageHandling/types';
import {UserType} from 'reduxFeatures/user/types';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {PopoverKeys} from 'reduxFeatures/settings/types';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {isEqualValue} from 'helpers/isEqualValue';

export const useFlatImageUploadScreen = (edit?: boolean, advertId?: number) => {
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
  } = useImagesToUpload();
  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails(isLessor);
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

  const [editFlat, {isLoading: isEditFlatLoading, isError: isEditFlatError}] =
    useEditFlatMutation();

  const dbImages = advert?.flat.mainPic
    ? [advert?.flat.mainPic, ...(advert?.flat.photos || [])]
    : advert?.flat.photos || [];
  const displaySavedImages = savedImages.lessor.flatImages;

  console.log('displaySavedImages', displaySavedImages);
  console.log('dbImages', dbImages);
  console.log('selectedImage', selectedImage);

  const {currentSelectionRef} = useSelectImage({
    edit: edit ?? false,
    userType: UserType.LESSOR,
    imageType: ImageType.Flat,
    dbImages,
    displaySavedImages,
  });

  useEffect(() => {
    if (totalImages > MAX_FLAT_IMAGES) {
      setError(`You can only upload ${MAX_FLAT_IMAGES} images`);
    } else {
      setError('');
    }
  }, [totalImages]);

  const {fadeInAnim} = useFadeInAnimation();

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.EditFlatImage : PopoverKeys.FlatImage,
    });

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setError('');
  };

  const isNotAllEqual = () => {
    if (edit) {
      return (
        !isEqualValue(dbImages, displaySavedImages) ||
        !isEqualValue(dbImages, imagesToUpload) ||
        !isEqualValue(dbImages, imagesToUpload) ||
        !isEqualValue(selectedImage?.uri, currentSelectionRef.current)
      );
    } else {
      !isEqualValue(displaySavedImages, imagesToUpload);
      !isEqualValue(displaySavedImages, imagesToUpload) ||
        !isEqualValue(selectedImage?.uri, currentSelectionRef.current);
    }
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
    const concatImages = [...imagesToUpload, ...savedImages.lessor.flatImages];

    console.log('concatImages', concatImages);
    const result = flatImagesSchema.safeParse(concatImages);
    console.log('Result', result);

    if (!result.success) {
      const err = result.error.errors[0].message;
      console.log('Error', err);
      setError(err);
      return;
    }
    const filteredImagesToUpload = imagesToUpload.filter(
      img => img.uri !== selectedImage?.uri,
    );

    const newImages = filteredImagesToUpload.map(img => ({
      uri: Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri,
      type: img.type,
      name: `flatImage-${img.fileName}`,
    }));

    const filteredExistingImages = savedImages.lessor.flatImages.filter(
      img => img.uri !== selectedImage?.uri,
    ) as ImageRecord[];

    const deletedIds = deletedRecordImages.map(img => img.blobId);

    const findMainImage = concatImages.find(
      img => img.uri === selectedImage?.uri,
    );

    let mainImage: ImageRecord | NewImage = findMainImage as ImageRecord;
    if (findMainImage && !('blobId' in findMainImage)) {
      mainImage = {
        uri:
          Platform.OS === 'ios'
            ? findMainImage?.uri.replace('file://', '')
            : findMainImage?.uri,
        type: (findMainImage as ImageToUpload)?.type,
        name: `flatImage-${(findMainImage as ImageToUpload)?.fileName}`,
      };
    }

    if (edit) {
      try {
        const imagesParams: EditFlatParams = {
          flatId: advert?.flat.id ?? 0,
          actionMethod: EditAdvertActions.Images,
          existingImages: filteredExistingImages,
          newImages: newImages,
          deletedImages: deletedIds,
          mainImage: mainImage,
        };
        console.log('imagesParams', imagesParams);
        await editFlat(imagesParams).unwrap();
        navigation.goBack();
        clearImagesToUpload();
      } catch (err) {
        createError(err);
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
    fadeInAnim,
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
