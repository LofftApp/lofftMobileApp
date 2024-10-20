import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';

// Redux 🐰

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Stylesheets 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';
import {useImagesToUpload} from '../../features/imageHandling/useImagesToUpload';
import {size} from 'react-native-responsive-sizes';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

const ImagePreviewRow = ({imageType}: {imageType: 'user' | 'flat'}) => {
  const {imagesToUpload, deleteImageToUpload, savedImages, deleteSavedImage} =
    useImagesToUpload();
  const {isLessor} = useNewUserDetails();

  const savedImagesDisplay = isLessor
    ? imageType === 'user'
      ? savedImages.lessor.userImages
      : savedImages.lessor.flatImages
    : savedImages.renter.userImages;

  return (
    <View style={styles.imageContainer}>
      {imagesToUpload.length > 0 &&
        imagesToUpload.map(image => {
          return (
            <View key={image.fileName}>
              <Pressable
                style={styles.closeButton}
                onPress={() => deleteImageToUpload(image.fileName)}>
                <LofftIcon name="x-close" size={12} color={Colors.White[100]} />
              </Pressable>
              <Image
                style={styles.image}
                source={{
                  uri: image.uri,
                }}
              />
            </View>
          );
        })}
      {savedImagesDisplay.length > 0 &&
        savedImagesDisplay.map(image => {
          return (
            <View key={image.fileName}>
              <Pressable
                style={styles.closeButton}
                onPress={() =>
                  deleteSavedImage({
                    userType: isLessor ? 'lessor' : 'renter',
                    imageType,
                    fileName: image.fileName,
                  })
                }>
                <LofftIcon name="x-close" size={12} color={Colors.White[100]} />
              </Pressable>
              <Image
                style={styles.image}
                source={{
                  uri: image.uri,
                }}
              />
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: size(12),
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
    backgroundColor: Colors.Tomato['100'],
  },
  textStyle: {},
});

export default ImagePreviewRow;
