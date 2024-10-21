import React from 'react';
import {View, Image, StyleSheet, Pressable, Text} from 'react-native';

// Redux 🐰

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Divider from 'components/bars/Divider';

// Stylesheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {useImagesToUpload} from '../../features/imageHandling/useImagesToUpload';
import {size} from 'react-native-responsive-sizes';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {fontStyles} from 'styleSheets/fontStyles';

const ImagePreviewRow = ({imageType}: {imageType: 'user' | 'flat'}) => {
  const {imagesToUpload, deleteImageToUpload, savedImages, deleteSavedImage} =
    useImagesToUpload();
  const {isLessor} = useNewUserDetails();

  const savedImagesDisplay = isLessor
    ? imageType === 'user'
      ? savedImages.lessor.userImages
      : savedImages.lessor.flatImages
    : savedImages.tenant.userImages;

  return (
    <>
      {imagesToUpload.length > 0 && (
        <>
          <View style={styles.textAndImageContainer}>
            <Text style={[fontStyles.headerSmall, {color: Color.Black[50]}]}>
              Images to upload
            </Text>

            <View style={styles.imageContainer}>
              {imagesToUpload.map(image => (
                <View key={image.fileName}>
                  <Pressable
                    style={styles.closeButton}
                    onPress={() => deleteImageToUpload(image.fileName)}>
                    <LofftIcon
                      name="x-close"
                      size={12}
                      color={Color.White[100]}
                    />
                  </Pressable>
                  <Image
                    style={styles.image}
                    source={{
                      uri: image.uri,
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        </>
      )}
      {imagesToUpload.length > 0 && savedImagesDisplay.length > 0 && (
        <Divider />
      )}
      {savedImagesDisplay.length > 0 && (
        <>
          <Text style={[fontStyles.headerSmall, {color: Color.Black[50]}]}>
            Saved Images
          </Text>
          <View style={styles.textAndImageContainer}>
            <View style={styles.imageContainer}>
              {savedImagesDisplay.length > 0 &&
                savedImagesDisplay.map(image => {
                  return (
                    <View key={image.fileName}>
                      <Pressable
                        style={styles.closeButton}
                        onPress={() =>
                          deleteSavedImage({
                            userType: isLessor ? 'lessor' : 'tenant',
                            imageType,
                            fileName: image.fileName,
                          })
                        }>
                        <LofftIcon
                          name="x-close"
                          size={12}
                          color={Color.White[100]}
                        />
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
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textAndImageContainer: {
    flexDirection: 'column',
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
  textStyle: {},
});

export default ImagePreviewRow;
