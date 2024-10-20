import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

// Redux 🐰

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Stylesheets 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';
import {useImagesToUpload} from '../../features/imageHandling/useImagesToUpload';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import {
  MAX_FLAT_IMAGES,
  MAX_USER_IMAGES,
} from 'components/componentData/constants';

const ImagePreviewRow = ({user = false}: {user: boolean}) => {
  const {imagesToUpload, deleteImageToUpload} = useImagesToUpload();

  return (
    <View style={styles.imageContainer}>
      {imagesToUpload.length > 0 ? (
        imagesToUpload.map(image => {
          console.log('image', image.fileName);
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
        })
      ) : (
        <Text style={fontStyles.headerExtraSmall}>
          Add up to {user ? MAX_USER_IMAGES : MAX_FLAT_IMAGES} images
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: size(20),
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
