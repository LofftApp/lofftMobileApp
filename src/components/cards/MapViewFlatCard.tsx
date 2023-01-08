import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

// Components 🪢
import Chips from '@Components/buttons/Chips';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Assets 🪴
import imageExample from '@Assets/images/flat-image.jpeg';

const MapViewFlatCard = () => {
  const [save, setSave] = useState(false);

  return (
    <View style={styles.flatCardContainer}>
      <View style={styles.imageDetailsBlock}>
        <View style={styles.imageContainer}>
          <Image source={imageExample} style={styles.flatCardImage} />
        </View>
        <View style={styles.details}>
          <View style={styles.flatCardbuttonsWrap}>
            <View style={styles.flatCardMatchingScoreButton}>
              <Text style={styles.flatCardMatchingScoreButtonFont}>🌟96%</Text>
            </View>
            <Pressable
              onPress={() => (save === false ? setSave(true) : setSave(false))}>
              {save === true ? (
                <LofftIcon
                  name="heart-filled"
                  size={20}
                  color={Color.Tomato[100]}
                />
              ) : (
                <LofftIcon name="heart" size={20} color={Color.Tomato[100]} />
              )}
            </Pressable>
          </View>
          <View style={styles.flatCardMetadataWrap}>
            <View style={styles.coreDetails}>
              <Text style={fontStyles.headerSmall}>860 € 26 m2</Text>
              <Text style={fontStyles.bodyMedium}>
                🧘 Calm flat in the centre of Moabit
              </Text>
            </View>
            <Text
              style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
              Moabit, Berlin
            </Text>
          </View>
        </View>
      </View>
      <Chips />
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    height: 260,
    width: 333,
    marginHorizontal: 16,
    padding: 8,
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: Color.White[100],
  },
  imageDetailsBlock: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 8,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  coreDetails: {
    marginTop: 15,
  },
  flatCardImage: {
    height: 168,
    width: 168,
    borderRadius: 12,
  },

  flatCardbuttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  flatCardMatchingScoreButton: {
    backgroundColor: Color.Mint[10],
    height: 27,
    width: 63,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatCardMatchingScoreButtonFont: {
    fontWeight: '700',
    fontSize: 15,
    color: Color.Mint[100],
  },

  flatCardMetadataWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flatCardMetadataLocation: {
    color: Color.Black[50],
  },
});

export default MapViewFlatCard;
