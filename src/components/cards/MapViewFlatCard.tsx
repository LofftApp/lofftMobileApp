import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';

// Firebase & APIs
// import {saveFlatToUserLikes} from '@Api/firebase/firestoreActions';
// import auth from '@react-native-firebase/auth';

// Components 🪢
import Chips from '@Components/buttons/Chips';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import MatchingScoreButton from '@Components/buttons/MatchingScoreButton';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Assets 🪴
import noFlatImage from '@Assets/images/no-flat-image.png';

const MapViewFlatCard = ({
  flatId,
  price,
  match,
  district,
  images,
  likedUsers,
}: any) => {
  const [save, setSave] = useState(false);
  // useEffect(() => {
  //   if (likedUsers && likedUsers.includes(auth()?.currentUser?.uid)) {
  //     setSave(true);
  //   }
  // }, []);

  return (
    <View style={styles.boundryContainer}>
      <View style={styles.flatCardContainer}>
        <View style={styles.imageDetailsBlock}>
          <Image
            source={
              images ? {uri: images[0], width: 200, height: 300} : noFlatImage
            }
            style={styles.flatCardImage}
          />
          <View style={styles.details}>
            <View style={styles.flatCardbuttonsWrap}>
              <MatchingScoreButton size="Small" score={match} />
              {/* <Pressable
                onPress={() => {
                  setSave(!save);
                  saveFlatToUserLikes({flatId, add: save});
                }}>
                {save === true ? (
                  <LofftIcon
                    name="heart-filled"
                    size={20}
                    color={Color.Tomato[100]}
                  />
                ) : (
                  <LofftIcon name="heart" size={20} color={Color.Tomato[100]} />
                )}
              </Pressable> */}
            </View>
            <View style={styles.flatCardMetadataWrap}>
              <View style={styles.coreDetails}>
                <Text style={fontStyles.headerSmall}>{price} € 26 m2</Text>
                <Text style={fontStyles.bodyMedium}>
                  🧘 Calm flat in the centre of {district}
                </Text>
              </View>
              <Text
                style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
                {district}, Berlin
              </Text>
            </View>
          </View>
        </View>
        <Chips />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boundryContainer: {
    flex: 1,
    paddingLeft: 16,
    width: Dimensions.get('screen').width,
  },
  flatCardContainer: {
    height: 260,
    width: 333,
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
