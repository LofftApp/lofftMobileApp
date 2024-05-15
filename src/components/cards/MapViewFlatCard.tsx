import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';

// Redux 🏪
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {toggleFavorite} from '@Redux/adverts/advertMiddleware';

// Components 🪢
import Chips from 'components/buttons/Chips';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import MatchingScoreButton from 'components/buttons/MatchingScoreButton';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Assets 🪴
import noFlatImage from '@Assets/images/no-flat-image.png';

// Helpers
import {tagSorter} from '@Helpers/tagSorter';

const MapViewFlatCard = (advertR: any, id: number) => {
  const userProfile = useAppSelector((state: any) => state.user.user);
  const advert = advertR.advert;
  const characteristicsTags = tagSorter(
    userProfile.profile.characteristics,
    advert.flat.characteristics,
  );

  const featuresTags = tagSorter(userProfile.filter, advert.flat.features);

  const dispatch = useAppDispatch();
  return (
    <View style={styles.boundryContainer}>
      <View style={styles.flatCardContainer}>
        <View style={styles.imageDetailsBlock}>
          <Image
            source={
              advert.flat.photos
                ? {uri: advert.flat.photos[0], width: 200, height: 300}
                : noFlatImage
            }
            style={styles.flatCardImage}
          />
          <View style={styles.details}>
            <View style={styles.flatCardbuttonsWrap}>
              <MatchingScoreButton size="Small" score={advert.matchScore} />
              <Pressable
                onPress={() => {
                  dispatch(toggleFavorite(id));
                }}>
                {/* ! This need to be updated with validation */}
                {advert.favorite ? (
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
                <Text style={fontStyles.headerSmall}>
                  {advert.price} € 26 m2
                </Text>
                <Text style={fontStyles.bodyMedium}>{advert.tagline}</Text>
              </View>
              <Text
                style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
                {advert.flat.district}, {advert.flat.city}
              </Text>
            </View>
          </View>
        </View>
        <Chips tags={featuresTags.positiveTags} features={true} />
        <Chips tags={characteristicsTags.positiveTags} features={false} />
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
