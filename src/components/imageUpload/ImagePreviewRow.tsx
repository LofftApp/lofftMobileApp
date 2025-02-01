import React from 'react';
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
import ImageSwiper from 'components/cards/ImageSwiper';

const ImagePreviewRow = ({imageType}: {imageType: 'user' | 'flat'}) => {
  const {imagesToUpload, deleteImageToUpload, savedImages, deleteSavedImage} =
    useImagesToUpload();
  const {isLessor} = useNewUserDetails();
  console.log('savedImages', savedImages);
  const savedImagesDisplay = isLessor
    ? imageType === 'user'
      ? savedImages.lessor.userImages
      : savedImages.lessor.flatImages
    : savedImages.tenant.userImages;

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
              deleteImage={fileName =>
                deleteSavedImage({
                  userType: isLessor ? 'lessor' : 'tenant',
                  imageType,
                  fileName,
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
              deleteImage={fileName => deleteImageToUpload(fileName)}
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
