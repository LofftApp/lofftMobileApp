import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import imageExample from '../../assets/images/flat-image.jpeg';
import Color from '../../styles/lofftColorPallet.json';
import {HeartDefault} from '../../assets';
import {HeartSaved} from '../../assets';
import PaginationBar from '@Components/bars/PaginationBar';
import Chips from '../buttons/Chips';

const FlatListCard = () => {
  const [screen, setScreen] = useState(1);
  const [save, setSave] = useState(false);

  return (
    <View style={styles.flatCardContainer}>
      <Image source={imageExample} style={styles.flatCardImage}></Image>
      <View style={styles.flatCardButtonsOverlay}>
        <View style={styles.flatCardbuttonsWrap}>
          <View style={styles.flatCardMatchingScoreButton}>
            <Text style={styles.flatCardMatchingScoreButtonFont}>🌟 96%</Text>
          </View>
          <Pressable
            style={styles.flatCardSaveButton}
            onPress={() => (save === false ? setSave(true) : setSave(false))}>
            {save === true ? <HeartSaved /> : <HeartDefault />}
          </Pressable>
          <View style={styles.flatCardImagesScroll}>
            <PaginationBar screen={screen} totalScreens={5} />
          </View>
        </View>
      </View>
      <View style={styles.flatCardInfoWrap}>
        <View style={styles.flatCardMetadataWrap}>
          <Text style={styles.flatCardMetadataPriceAndSize}>860 € 26 m2</Text>
          <Text style={styles.flatCardMetadataLocation}>Moabit, Berlin</Text>
          <Text style={styles.flatCardMetadataTitle}>
            🧘 Calm flat in the centre of Moabit
          </Text>
        </View>
        <View style={styles.flatCardChipsWrap}>
          <Chips></Chips>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
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
  },
  flatCardbuttonsWrap: {
    flex: 1,
  },

  flatCardMatchingScoreButton: {
    backgroundColor: Color.Mint[10],
    height: 38,
    width: 85,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatCardSaveButton: {
    position: 'absolute',
    right: 0,
  },
  flatCardImagesScroll: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  flatCardMatchingScoreButtonFont: {
    fontWeight: '600',
    fontSize: 18,
    color: Color.Mint[100],
  },

  flatCardInfoWrap: {
    padding: 8,
    flex: 1,
  },
  flatCardChipsWrap: {
    flex: 1,
  },
  flatCardMetadataWrap: {
    // flex: 1,

    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flatCardMetadataPriceAndSize: {
    fontSize: 18,
    fontWeight: '600',
  },
  flatCardMetadataLocation: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.Black[50],
    position: 'absolute',
    right: 0,
    top: 2,
  },
  flatCardMetadataTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
});

export default FlatListCard;
