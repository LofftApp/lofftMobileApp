import React from 'react';
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

// Redux 🐰
import {deleteImageToUpload} from './userImageUploadSlice';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Stylesheets 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';

const ImagePreviewRow = () => {
  const dispatch = useAppDispatch();
  const userImages = useAppSelector(
    (state: any) => state.imageUpload.imagesToUpload,
  );
  return (
    <View style={styles.imageContainer}>
      {userImages.length > 0 ? (
        userImages.map((image: string) => {
          return (
            <View key={image}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => dispatch(deleteImageToUpload(image))}>
                <LofftIcon name="x-close" size={12} color={Colors.White[100]} />
              </TouchableOpacity>
              <Image
                style={styles.image}
                source={{
                  uri: image,
                }}
              />
            </View>
          );
        })
      ) : (
        <Text>0 Images to upload add upto 5 images</Text>
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
    width: 60,
    height: 60,
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
