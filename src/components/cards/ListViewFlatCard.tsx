import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

// Firebase & API 🧠
import {saveFlatToUserLikes} from '@Api/firebase/firestoreActions';
import auth from '@react-native-firebase/auth';

// Components 🪢
import PaginationBar from '@Components/bars/PaginationBar';
import Chips from '@Components/buttons/Chips';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import MatchingScoreButton from '@Components/buttons/MatchingScoreButton';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Assets 🪴
import noFlatImage from '@Assets/images/no-flat-image.png';

const ListViewFlatCard = ({
  flatId,
  match,
  district,
  price,
  images,
  likedUsers,
}: any) => {
  const [screen] = useState(1);
  const [save, setSave] = useState(false);
  useEffect(() => {
    if (likedUsers && likedUsers.includes(auth()?.currentUser?.uid)) {
      setSave(true);
    }
  }, []);

  return (
    <View style={styles.flatCardContainer}>
      <View>
        <Image
          // ! Currently only chooses the first image this will need to be enhanced with the swiped function and all images in a flatlist.
          source={
            images ? {uri: images[0], width: 200, height: 300} : noFlatImage
          }
          style={styles.flatCardImage}
        />
        <View style={styles.flatCardButtonsOverlay}>
          <View style={styles.flatCardbuttonsWrap}>
            {match ? (
              <View>
                <Pressable
                  style={styles.flatCardSaveButton}
                  onPress={() => {
                    setSave(!save);
                    saveFlatToUserLikes({flatId, add: save});
                  }}>
                  {save === true ? (
                    <LofftIcon
                      name="heart-filled"
                      size={25}
                      color={Color.Tomato[100]}
                    />
                  ) : (
                    <LofftIcon
                      name="heart"
                      size={25}
                      color={Color.Tomato[100]}
                    />
                  )}
                </Pressable>
              </View>
            ) : (
              <View></View>
            )}

            <PaginationBar screen={screen} totalScreens={5} />
          </View>
        </View>
      </View>
      <View style={styles.flatCardInfoWrap}>
        <View style={styles.flatCardMetadataWrap}>
          <View style={styles.apartmentLocationInfo}>
            {/* Size of WG is not in DB - 26 m2 */}
            <Text style={[fontStyles.headerSmall]}>{price} €</Text>
            <MatchingScoreButton size="Big" score={match} />
          </View>
          {district ? (
            <Text
              style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
              {district}, Berlin
            </Text>
          ) : null}
        </View>
        <View>
          <Chips />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginBottom: 16,
  },
  flatCardImage: {
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 12,
  },

  flatCardButtonsOverlay: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    padding: 16,
  },
  flatCardbuttonsWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },

  flatCardSaveButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
  },
  flatCardInfoWrap: {
    padding: 8,
  },
  flatCardMetadataWrap: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  apartmentLocationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatCardMetadataLocation: {
    color: Color.Black[50],
  },
});

export default ListViewFlatCard;
