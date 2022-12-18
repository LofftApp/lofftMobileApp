import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import imageExample from '../../assets/images/flat-image.jpeg';
import Color from '../../styles/lofftColorPallet.json';

const FlatListCard = () => {
  return (
    <View style={styles.flatCardContainer}>
      <Image source={imageExample} style={styles.flatCardImage}></Image>
      <View style={styles.flatCardButtonsOverlay}>
        <View style={styles.flatCardbuttonsWrap}>
          <View style={styles.flatCardMatchingScoreButton}>
            <Text style={styles.flatCardMatchingScoreButtonFont}>🌟 96%</Text>
          </View>
          <View style={styles.flatCardSaveButton}>
            <Text>Icon</Text>
          </View>
          <View style={styles.flatCardImagesScroll}>
            <Text>imageScroll</Text>
          </View>
        </View>
      </View>
      <View style={styles.flatCardInfoWrap}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    borderWidth: 2,
    height: 383,
  },
  flatCardImage: {
    height: 244,
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 12,
  },

  flatCardButtonsOverlay: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: 244,
    padding: 16,
    borderWidth: 2,
    borderColor: 'red',
  },
  flatCardbuttonsWrap: {
    borderWidth: 2,
    borderColor: 'red',
    flex: 1,
  },

  flatCardMatchingScoreButton: {
    backgroundColor: '#F3FDF9',
    borderWidth: 2,
    borderColor: 'red',
    height: 38,
    width: 85,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatCardSaveButton: {
    position: 'absolute',
    borderWidth: 2,
    right: 0,
    borderColor: 'red',
  },
  flatCardImagesScroll: {
    borderWidth: 2,
    borderColor: 'red',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  flatCardMatchingScoreButtonFont: {
    fontWeight: '600',
    fontSize: 18,
    color: Color.Mint[100],
  },

  flatCardInfoWrap: {},
});

export default FlatListCard;
