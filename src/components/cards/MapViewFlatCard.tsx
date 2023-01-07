import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

// Components 🪢
import Chips from '@Components/buttons/Chips';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

// Assets 🪴
import imageExample from '@Assets/images/flat-image.jpeg';

const Col = ({numRows, children}: any) => {
  return <View style={styles[`col${numRows}`]}>{children}</View>;
};

const Row = ({children}: any) => <View style={styles.row}>{children}</View>;

const MapViewFlatCard = () => {
  const [save, setSave] = useState(false);

  return (
    <View style={styles.flatCardContainer}>
      <Row>
        <Col numRows={1}>
          <Image source={imageExample} style={styles.flatCardImage} />
        </Col>
        <Col numRows={2}>
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
            <Text style={styles.flatCardMetadataLocation}>Moabit, Berlin</Text>
            <Text style={styles.flatCardMetadataTitle}>
              🧘 Calm flat in the centre of Moabit
            </Text>
            <Text style={styles.flatCardMetadataPriceAndSize}>860 € 26 m2</Text>
          </View>
        </Col>
      </Row>
      <Row>
        <Col numRows={3}>
          <Chips />
        </Col>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    height: 250,
    width: 333,
    padding: 8,
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: Color.White[100],
  },
  row: {flexDirection: 'row'},
  // col1: {flex: 1},
  col2: {flex: 1, paddingLeft: 8},
  col3: {flex: 1, paddingTop: 3},

  flatCardImage: {
    height: 168,
    width: 168,
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 12,
  },

  flatCardbuttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 'auto',
    marginTop: 20,
  },
  flatCardMetadataLocation: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.Black[50],
  },
  flatCardMetadataTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  flatCardMetadataPriceAndSize: {
    position: 'absolute',
    bottom: 0,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MapViewFlatCard;
