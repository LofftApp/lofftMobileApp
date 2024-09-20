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
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {toggleFavorite} from 'reduxFeatures/adverts/advertMiddleware';

// Components 🪢
import Chips from 'components/buttons/Chips';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import MatchingScoreButton from 'components/buttons/MatchingScoreButton';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Assets 🪴
import noFlatImage from 'Assets/images/no-flat-image.png';

// Helpers
import {tagSorter} from 'helpers/tagSorter';
import {width, height, size} from 'react-native-responsive-sizes';

// Types 🏷️
import type {Advert} from 'reduxFeatures/adverts/types';
import type {UserState} from 'reduxFeatures/user/types';
import {truncateTextAtWord} from 'helpers/truncateTextAtWord';

const MapViewFlatCard = ({advert}: {advert: Advert}) => {
  const currentUser = useAppSelector(
    (state: {user: UserState}) => state.user.user,
  );
  const dispatch = useAppDispatch();

  const characteristicsTags = tagSorter(
    currentUser.profile.characteristics ?? [],
    advert.flat.characteristics,
  );
  const featuresTags = tagSorter(
    currentUser.filter ?? [],
    advert.flat.features,
  );
  const maxTaglineLength = 35;

  return (
    <View style={styles.boundryContainer}>
      <View style={styles.flatCardContainer}>
        <View style={styles.imageDetailsBlock}>
          <Image
            source={
              advert.flat.photos
                ? {
                    uri: advert.flat.photos[0],
                    width: width(200),
                    height: height(300),
                  }
                : noFlatImage
            }
            style={styles.flatCardImage}
          />
          <View style={styles.details}>
            <View style={styles.flatCardbuttonsWrap}>
              <MatchingScoreButton
                size="Small"
                score={advert.matchScore ?? 5}
              />
              <Pressable
                onPress={() => {
                  dispatch(toggleFavorite(advert.id));
                }}>
                {/* ! This need to be updated with validation */}
                {advert.favorite ? (
                  <LofftIcon
                    name="heart-filled"
                    size={26}
                    color={Color.Tomato[100]}
                  />
                ) : (
                  <LofftIcon name="heart" size={26} color={Color.Tomato[100]} />
                )}
              </Pressable>
            </View>

            <View style={styles.flatCardMetadataWrap}>
              <View style={styles.coreDetails}>
                <Text style={fontStyles.headerSmall}>
                  {advert.monthlyRent}€
                  <Text style={fontStyles.headerSmall}>
                    {' '}
                    {advert.flat.size}
                    {advert.flat.measurementUnit}
                  </Text>
                </Text>
              </View>

              <View style={styles.taglineContainer}>
                <Text style={fontStyles.bodySmall}>
                  {truncateTextAtWord(advert.flat.tagLine, maxTaglineLength)}
                  {advert.flat.tagLine.length > maxTaglineLength && '...'}
                </Text>
                <Text
                  style={[
                    fontStyles.bodySmall,
                    styles.flatCardMetadataLocation,
                  ]}>
                  {advert.flat.district}, {advert.flat.city}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.chipsContainer}>
          <Chips tags={featuresTags.positiveTags} features={true} xs />
          <Chips tags={characteristicsTags.positiveTags} features={false} xs />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boundryContainer: {
    flex: 1,
    paddingHorizontal: size(8),
    width: Dimensions.get('screen').width,
  },
  flatCardContainer: {
    height: size(280),
    width: width(95),
    padding: size(8),
    borderRadius: 12,
    backgroundColor: Color.White[100],
  },
  imageDetailsBlock: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  details: {
    flex: 1,
    marginHorizontal: size(4),
    justifyContent: 'space-between',
  },
  coreDetails: {
    marginTop: size(10),
  },
  taglineContainer: {
    marginBottom: size(10),
    marginTop: size(10),
    flex: 1,
    gap: size(8),
    justifyContent: 'space-between',
  },
  flatCardImage: {
    width: size(168),
    height: size(168),
    borderRadius: 12,
  },

  flatCardbuttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  flatCardMatchingScoreButton: {
    backgroundColor: Color.Mint[10],
    height: size(27),
    width: size(63),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatCardMatchingScoreButtonFont: {
    fontWeight: '700',
    fontSize: size(15),
    color: Color.Mint[100],
  },

  flatCardMetadataWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flatCardMetadataLocation: {
    color: Color.Black[50],
  },
  chipsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default MapViewFlatCard;
