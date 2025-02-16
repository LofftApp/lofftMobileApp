import React, {useEffect, useState} from 'react';
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
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';



const ImagePreviewRow = ({imageType}: {imageType: 'user' | 'flat'}) => {
  const {
    imagesToUpload,
    deleteImageToUpload,
    savedImages,
    setSavedImages,
    deleteSavedImage,
  } = useImagesToUpload();
  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails(isLessor);

  console.log('savedImages', savedImages);
  const savedImagesDisplay =
    isNewUserLessor || isLessor
      ? imageType === 'user'
        ? savedImages.lessor.userImages
        : savedImages.lessor.flatImages
      : savedImages.tenant.userImages;
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
    source: 'saved' | 'upload';
  } | null>(null);

  console.log('savedImagesDisplay', savedImagesDisplay);
  console.log('Selected Image', selectedImage);

  const handleImageSelection = (
    uri: string,
    type: string,
    source: 'saved' | 'upload',
  ) => {
    setSelectedImage({uri, type, source});
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
                selectedImage?.source === 'saved'
                  ? savedImagesDisplay.findIndex(
                      img => img.uri === selectedImage.uri,
                    )
                  : null
              }
              onPress={index =>
                handleImageSelection(
                  savedImagesDisplay[index as number].uri,
                  savedImagesDisplay[index as number].type,
                  'saved',
                )
              }
              deleteImage={uri =>
                deleteSavedImage({
                  userType: isNewUserLessor || isLessor ? 'lessor' : 'tenant',
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
                selectedImage?.source === 'upload'
                  ? imagesToUpload.findIndex(
                      img => img.uri === selectedImage.uri,
                    )
                  : null
              }
              onPress={index =>
                handleImageSelection(
                  imagesToUpload[index as number].uri,
                  savedImagesDisplay[index as number].type,
                  'upload',
                )
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
