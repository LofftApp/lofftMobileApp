import React, {useEffect, useMemo, useRef, useState} from 'react';
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
  // In your hook (useImagesToUpload), add an index ref:
  const currentSelectionIndexRef = useRef<number | null>(null);

  // Your existing ref to store the selected URI:
  const currentSelectionRef = useRef<string | null>(selectedImage?.uri || null);

  // Then, in your effect that runs when displaySavedImages changes:
  useEffect(() => {
    // --- EDIT MODE ---
    if (edit && displaySavedImages.length > 0) {
      // Find the index of the currently selected image
      const currentIndex = displaySavedImages.findIndex(
        img => img.uri === selectedImage?.uri,
      );

      if (currentIndex === -1) {
        // The previously selected image is gone.
        // Use the stored index (if any) as a starting point; default to 0.
        let newIndex = currentSelectionIndexRef.current ?? 0;
        if (newIndex >= displaySavedImages.length) {
          newIndex = displaySavedImages.length - 1;
        }
        const newSelected = displaySavedImages[newIndex] as ImageRecord;
        setSelectedImage({
          uri: newSelected.uri,
          source: 'saved',
          blobId: newSelected.blobId,
        });
        // Update both refs.
        currentSelectionRef.current = newSelected.uri;
        currentSelectionIndexRef.current = newIndex;
        console.log(
          'Edit mode: Selected image was deleted. New selection:',
          newSelected,
        );
      } else {
        // The current selection still exists.
        // Update the index ref so we know its position.
        currentSelectionIndexRef.current = currentIndex;
        console.log(
          'Edit mode: Current selection exists at index:',
          currentIndex,
        );
      }
    }

    // --- NON-EDIT MODE ---
    else if (
      !edit &&
      (imagesToUpload.length > 0 || displaySavedImages.length > 0)
    ) {
      if (selectedImage) {
        // Check if the selected image still exists in either uploads or saved images.
        const inUploaded = imagesToUpload.find(
          img => img.uri === selectedImage.uri,
        );
        const inSaved = displaySavedImages.find(
          img => img.uri === selectedImage.uri,
        );
        if (!inUploaded && !inSaved) {
          // The selected image was deleted—choose a default.
          let defaultImage: SavedImage | undefined;
          let source: 'upload' | 'saved' = 'saved';
          if (imagesToUpload.length > 0) {
            defaultImage = imagesToUpload[0];
            source = 'upload';
          } else if (displaySavedImages.length > 0) {
            defaultImage = displaySavedImages[0];
            source = 'saved';
          }
          if (defaultImage) {
            currentSelectionRef.current = defaultImage.uri;
            setSelectedImage({
              uri: defaultImage.uri,
              source,
            });
            console.log(
              'Non-edit mode: selected image was deleted, defaulting to:',
              defaultImage,
            );
          }
        } else {
          // The selected image still exists—update its source if needed.
          let newSource: 'upload' | 'saved' = selectedImage.source;
          if (inSaved) {
            newSource = 'saved';
          } else if (inUploaded) {
            newSource = 'upload';
          }
          if (newSource !== selectedImage.source) {
            setSelectedImage({
              ...selectedImage,
              source: newSource,
            });
            console.log(
              'Non-edit mode: updating selection source to:',
              newSource,
            );
          } else {
            console.log(
              'Non-edit mode: keeping current selection:',
              selectedImage,
            );
          }
        }
      } else {
        // No selection exists yet: choose a default.
        let defaultImage: SavedImage | undefined;
        let source: 'upload' | 'saved' = 'saved';
        if (imagesToUpload.length > 0) {
          defaultImage = imagesToUpload[0];
          source = 'upload';
        } else if (displaySavedImages.length > 0) {
          defaultImage = displaySavedImages[0];
          source = 'saved';
        }
        if (defaultImage) {
          currentSelectionRef.current = defaultImage.uri;
          setSelectedImage({
            uri: defaultImage.uri,
            source,
          });
          console.log(
            'Non-edit mode: no selection, defaulting to:',
            defaultImage,
          );
        }
      }
    }

    // --- CLEAR SELECTION ---
    if (displaySavedImages.length === 0 && imagesToUpload.length === 0) {
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
  ]);

  // useEffect(() => {
  //   if (edit && displaySavedImages.length > 0) {
  //     const currentSelectionStillExists = displaySavedImages.some(
  //       img => img.uri === currentSelectionRef.current,
  //     );
  //     console.log('currentSelectionStillExists', currentSelectionStillExists);

  //     if (!currentSelectionStillExists) {
  //       firstImageRef.current = displaySavedImages[0] as ImageRecord;
  //       currentSelectionRef.current = firstImageRef.current.uri;
  //       setSelectedImage({
  //         uri: firstImageRef.current.uri,
  //         source: 'saved',
  //         blobId: firstImageRef.current?.blobId,
  //       });
  //       console.log('SelectedImage updated to:', firstImageRef.current);
  //     }
  //   }

  //   if (!edit && (imagesToUpload.length > 0 || displaySavedImages.length > 0)) {
  //     // First, try to find the selected image among imagesToUpload
  //     let findSelectedImage: SavedImage | undefined;
  //     findSelectedImage = imagesToUpload.find(
  //       img => img.uri === currentSelectionRef.current,
  //     );

  //     if (findSelectedImage) {
  //       setSelectedImage({
  //         uri: findSelectedImage.uri,
  //         source: 'upload',
  //       });
  //       console.log('SelectedImage set to upload image:', findSelectedImage);
  //     } else {
  //       // If not found there, try to find it among saved images.
  //       findSelectedImage = displaySavedImages.find(
  //         img => img.uri === currentSelectionRef.current,
  //       );
  //       if (findSelectedImage) {
  //         setSelectedImage({
  //           uri: findSelectedImage.uri,
  //           source: 'saved',
  //         });
  //         console.log('SelectedImage set to saved image:', findSelectedImage);
  //       }
  //     }
  //   }

  //   if (displaySavedImages.length === 0 && imagesToUpload.length === 0) {
  //     // If no images left, clear selection
  //     setSelectedImage(null);
  //     currentSelectionRef.current = null;
  //     console.log('SelectedImage cleared');
  //   }
  // }, [displaySavedImages, imagesToUpload, setSelectedImage, edit]);

  useEffect(() => {
    if (edit && displaySavedImages.length === 0 && imagesToUpload.length > 0) {
      const firstUploadedImage = imagesToUpload[0];
      currentSelectionRef.current = firstUploadedImage.uri;
      setSelectedImage({
        uri: firstUploadedImage.uri,
        source: 'upload',
      });
      console.log(
        'SelectedImage set to first uploaded image:',
        firstUploadedImage,
      );
    }
  }, [imagesToUpload, displaySavedImages, setSelectedImage, edit]);

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
