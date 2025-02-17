import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, SafeAreaView, Platform} from 'react-native';
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
import {
  useEditFlatMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {
  ImageRecord,
  ImageToUpload,
  NewImage,
  SavedImage,
  SelectedImage,
} from 'reduxFeatures/imageHandling/types';
import {EditAdvertActions, EditFlatParams} from 'reduxFeatures/adverts/types';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

const FlatImageUploadScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;

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

  const [editFlat, {isLoading: isEditFlatLoading, isError: isEditFlatError}] =
    useEditFlatMutation();

  const dbImages = advert?.flat.mainPic
    ? [advert?.flat.mainPic, ...(advert?.flat.photos || [])]
    : advert?.flat.photos || [];
  const displaySavedImages = savedImages.lessor.flatImages;

  console.log('displaySavedImages', displaySavedImages);
  console.log('dbImages', dbImages);
  console.log('selectedImage', selectedImage);

  useEffect(() => {
    if (edit && dbImages.length > 0) {
      setSavedImages({
        userType: 'lessor',
        imageType: 'flat',
        images: dbImages,
      });

      console.log('SelectedImage in use', selectedImage);
    }

    if (!edit && displaySavedImages.length > 0) {
      setSavedImages({
        userType: 'lessor',
        imageType: 'flat',
        images: displaySavedImages,
      });
      if (selectedImage) {
        currentSelectionRef.current = selectedImage.uri;
        setSelectedImage(selectedImage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentSelectionIndexRef = useRef<number | null>(null);

  // Track the currently selected URI
  const currentSelectionRef = useRef<string | null>(selectedImage?.uri || null);

  // Helper: Find an existing image in either list
  const findImageByUri = useCallback(
    (uri: string) =>
      imagesToUpload.find(img => img.uri === uri) ||
      displaySavedImages.find(img => img.uri === uri),
    [imagesToUpload, displaySavedImages],
  );

  // Helper: Get the first available image
  const getDefaultImage = useCallback((): SelectedImage | null => {
    const defaultImage = imagesToUpload[0] || displaySavedImages[0];
    const source = imagesToUpload.length > 0 ? 'upload' : 'saved';
    return defaultImage ? {uri: defaultImage.uri, source} : null;
  }, [imagesToUpload, displaySavedImages]);

  useEffect(() => {
    if (edit) {
      return;
    }

    // 1️⃣ Case 1: If the selected image was deleted
    if (selectedImage && !findImageByUri(selectedImage.uri)) {
      const defaultImage = getDefaultImage();
      if (defaultImage) {
        currentSelectionRef.current = defaultImage.uri;
        setSelectedImage(defaultImage);
      }

      console.log('Selected image was deleted – defaulting to:', defaultImage);
    }

    // 2️⃣ Case 2: If the selected image is still in the uploads but now saved
    if (selectedImage && selectedImage.source === 'upload') {
      const savedImage = displaySavedImages.find(
        img => img.uri === selectedImage.uri,
      );
      if (savedImage) {
        // Image has moved to saved images; update source
        const updatedImage: SelectedImage = {
          uri: savedImage.uri,
          source: 'saved',
        };
        currentSelectionRef.current = updatedImage.uri;
        setSelectedImage(updatedImage);
        console.log('Selected image moved to saved images:', selectedImage);
      }
    }

    // 3️⃣ Case 3: If no image is selected, select the default one
    if (!selectedImage) {
      const defaultImage = getDefaultImage();
      if (defaultImage) {
        currentSelectionRef.current = defaultImage.uri;
        setSelectedImage(defaultImage);
      }
      console.log('No image selected – defaulting to:', defaultImage);
    }

    // 4️⃣ Case 4: If no images are available at all
    if (imagesToUpload.length === 0 && displaySavedImages.length === 0) {
      setSelectedImage(null);
      currentSelectionRef.current = null;
      console.log('No images available – selection cleared');
    }
  }, [
    displaySavedImages,
    imagesToUpload,
    edit,
    selectedImage,
    setSelectedImage,
    findImageByUri,
    getDefaultImage,
  ]);

  //EDIT MODE
  useEffect(() => {
    if (!edit) {
      return;
    }

    // Case 1: Handle selected image deletion
    const currentIndex = displaySavedImages.findIndex(
      img => img.uri === currentSelectionRef.current,
    );

    if (displaySavedImages.length > 0) {
      if (currentIndex === -1) {
        const newIndex = Math.min(
          currentSelectionIndexRef.current ?? 0,
          displaySavedImages.length - 1,
        );
        const newSelected = displaySavedImages[newIndex] as ImageRecord;
        setSelectedImage({
          uri: newSelected.uri,
          source: 'saved',
          blobId: newSelected.blobId,
        });
        currentSelectionRef.current = newSelected.uri;
        currentSelectionIndexRef.current = newIndex;
      } else {
        currentSelectionIndexRef.current = currentIndex;
      }
    }

    // Case 2: Select first uploaded image if no saved images exist
    if (displaySavedImages.length === 0 && imagesToUpload.length > 0) {
      const firstUploaded = imagesToUpload[0];
      currentSelectionRef.current = firstUploaded.uri;
      setSelectedImage({
        uri: firstUploaded.uri,
        source: 'upload',
      });
    }

    // Case 3: If all images are gone, clear selection
    if (imagesToUpload.length === 0 && displaySavedImages.length === 0) {
      setSelectedImage(null);
      currentSelectionRef.current = null;
      console.log('SelectedImage cleared');
    }
  }, [imagesToUpload, displaySavedImages, edit, setSelectedImage]);

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
          userType: 'lessor',
          imageType: 'flat',
          images: result.data,
        });
        clearImagesToUpload();
      }, 1000);
    }

    setError('');
  };

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
          fadeAnim={fadeAnim}
          error={error}
          imageType="flat"
        />
        <View style={styles.footerContainer}>
          <Divider />
          {error && <ErrorMessage message={error} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={
              edit ? (
                isEditFlatLoading ? (
                  <LoadingButtonIcon />
                ) : (
                  'Save'
                )
              ) : (
                'Continue'
              )
            }
            disabled={totalImages > MAX_FLAT_IMAGES || isEditFlatLoading}
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
