import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, Image, StyleSheet} from 'react-native';

const ImagePreviewRow = () => {
  const userImages = useSelector(
    (state: any) => state.imageUpload.imagesToUpload,
  );
  return (
    <View style={styles.imageContainer}>
      {userImages.length > 0 ? (
        userImages.map((image: string) => {
          return (
            <Image
              key={image}
              style={styles.image}
              source={{
                uri: image,
              }}
            />
          );
        })
      ) : (
        <Text>0 Images to upload</Text>
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
  },
});

export default ImagePreviewRow;
