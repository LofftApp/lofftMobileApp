import React, {useCallback} from 'react';
import {View, StyleSheet, Text} from 'react-native';

// Redux 🐰

// Components 🪢
import Divider from 'components/bars/Divider';

// Stylesheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {useImagesToUpload} from '../../features/imageHandling/useImagesToUpload';
import {size} from 'react-native-responsive-sizes';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {fontStyles} from 'styleSheets/fontStyles';
import ImageSwiper from 'components/images/ImageSwiper';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {
  ImageSource,
  ImageType,
  SelectedImage,
} from 'reduxFeatures/imageHandling/types';
import {UserType} from 'reduxFeatures/user/types';

const ImagePreviewRow = ({imageType}: {imageType: ImageType}) => {
  const {
    imagesToUpload,
    deleteImageToUpload,
    savedImages,
    deleteSavedImage,
    setSelectedImage,
    selectedImage,
  } = useImagesToUpload();
  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails(isLessor);

  const getSelectedImage = () => {
    if (isLessor || isNewUserLessor) {
      return imageType === ImageType.User
        ? selectedImage?.lessor?.user
        : selectedImage?.lessor?.flat;
    }
    return selectedImage?.tenant?.user;
  };

  console.log('getSelectedImage()', getSelectedImage());

  const savedImagesDisplay =
    isNewUserLessor || isLessor
      ? imageType === ImageType.User
        ? savedImages.lessor.userImages
        : savedImages.lessor.flatImages
      : savedImages.tenant.userImages;

  const handleImageSelection = ({
    uri,
    source,
    blobId,
    userType,
  }: SelectedImage) => {
    if (blobId !== undefined) {
      setSelectedImage({uri, source, blobId, userType, imageType});
    } else {
      setSelectedImage({uri, source, userType, imageType});
    }
  };
  return (
    <>
      {savedImagesDisplay.length > 0 && (
        <>
          <View style={styles.textAndImageContainer}>
            <Text style={[fontStyles.headerSmall, {color: Color.Black[50]}]}>
              Saved Images
            </Text>

            <ImageSwiper
              images={savedImagesDisplay}
              imageContainerHeight={size(110)}
              imageContainerWidth={size(110)}
              snapToInterval={size(100)}
              selectedIndex={
                getSelectedImage()?.source === ImageSource.Saved
                  ? savedImagesDisplay.findIndex(
                      img => img.uri === getSelectedImage()?.uri,
                    )
                  : null
              }
              onPress={index => {
                const image = savedImagesDisplay[index as number];
                const blobId = 'blobId' in image ? image.blobId : undefined;
                handleImageSelection({
                  uri: image.uri,
                  source: ImageSource.Saved,
                  blobId,
                  userType:
                    isNewUserLessor || isLessor
                      ? UserType.LESSOR
                      : UserType.TENANT,
                  imageType,
                });
              }}
              deleteImage={uri =>
                deleteSavedImage({
                  userType:
                    isNewUserLessor || isLessor
                      ? UserType.LESSOR
                      : UserType.TENANT,
                  imageType,
                  uri,
                })
              }
            />
          </View>
        </>
      )}
      {imagesToUpload.length > 0 && savedImagesDisplay.length > 0 && (
        <Divider />
      )}
      {imagesToUpload.length > 0 && (
        <>
          <View style={styles.textAndImageContainer}>
            <Text style={[fontStyles.headerSmall, {color: Color.Black[50]}]}>
              Images to upload
            </Text>
            <ImageSwiper
              images={imagesToUpload}
              imageContainerHeight={size(110)}
              imageContainerWidth={size(110)}
              snapToInterval={size(100)}
              selectedIndex={
                getSelectedImage()?.source === ImageSource.Upload
                  ? imagesToUpload.findIndex(
                      img => img.uri === getSelectedImage()?.uri,
                    )
                  : null
              }
              onPress={index =>
                handleImageSelection({
                  uri: imagesToUpload[index as number].uri,
                  source: ImageSource.Upload,
                  userType:
                    isNewUserLessor || isLessor
                      ? UserType.LESSOR
                      : UserType.TENANT,
                  imageType,
                })
              }
              deleteImage={uri => deleteImageToUpload(uri)}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textAndImageContainer: {
    gap: size(10),
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: size(12),
  },
  image: {
    width: size(120),
    height: size(120),
    borderRadius: 12,
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: -8,
    zIndex: 2,
    marginTop: -8,
    width: size(25),
    height: size(25),
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Tomato['100'],
  },
});

export default ImagePreviewRow;
