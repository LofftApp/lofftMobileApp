import React from 'react';
import {useAppDispatch} from 'reduxCore/hooks';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

// Redux 🐰

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Stylesheets 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';
import {useImagesToUpload} from './useImagesToUpload';

const ImagePreviewRow = () => {
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
        <Text>0 Images to upload add up to 5 images</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 12,
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
    marginTop: -5,
    width: 15,
    height: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Tomato['100'],
  },
});

export default ImagePreviewRow;
