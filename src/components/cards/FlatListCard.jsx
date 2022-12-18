import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import imageExample from '../../assets/images/flat-image.jpeg';

const FlatListCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.flatImageWrap}>
        <ImageBackground
          source={imageExample}
          resizeMode="cover"
          style={styles.flatImage}></ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 2,
    height: 383,
    borderRadius: 12,
  },
  flatImageWrap: {},
  flatImage: {
    height: 244,
    overflow: 'hidden',
    borderRadius: 12,
  },
});

export default FlatListCard;
