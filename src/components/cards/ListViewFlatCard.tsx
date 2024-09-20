import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
// Redux 🏗️
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';
import Chips from 'components/buttons/Chips';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import MatchingScoreButton from 'components/buttons/MatchingScoreButton';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Assets 🪴
import LofftHeaderPhoto from './LofftHeaderPhoto';
import {toggleFavorite} from 'reduxFeatures/adverts/advertMiddleware';

// Helpers
import {tagSorter} from 'helpers/tagSorter';
// Types 🏷️
import type {UserState} from 'reduxFeatures/user/types';
import type {Advert} from 'reduxFeatures/adverts/types';
import {SearchScreenNavigationProp} from '../../../navigationStacks/types';

const ListViewFlatCard = ({advert}: {advert: Advert}) => {
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const currentUser = useAppSelector(
    (state: {user: UserState}) => state.user.user,
  );

  const characteristicsTags = tagSorter(
    currentUser.profile.characteristics ?? [],
    advert.flat.characteristics ?? [],
  );
  const featuresTags = tagSorter(
    currentUser.filter ?? [],
    advert.flat.features,
  );

  const dispatch = useAppDispatch();
  return (
    <View style={styles.flatCardContainer}>
      <View style={styles.flatCardButtonsOverlay}>
        <View style={styles.flatCardbuttonsWrap}>
          {advert.matchScore && (
            <View>
              <Pressable
                onPress={() => {
                  dispatch(toggleFavorite(advert.id ?? 0));
                }}>
                {advert.favorite ? (
                  <LofftIcon
                    name="heart-filled"
                    size={25}
                    color={Color.Tomato[100]}
                  />
                ) : (
                  <LofftIcon name="heart" size={25} color={Color.Tomato[100]} />
                )}
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <View style={styles.flatCardImage}>
        <LofftHeaderPhoto
          imageContainerHeight={size(300)}
          images={advert.flat.photos ?? []}
        />
      </View>
      <View style={styles.flatCardInfoWrap}>
        <View style={styles.flatCardMetadataWrap}>
          <View style={styles.apartmentLocationInfo}>
            <View style={styles.apartmentMonthlyRentSize}>
              <Text style={[fontStyles.headerSmall]}>
                {advert.monthlyRent} €
              </Text>
              <Text style={[fontStyles.headerSmall]}>
                {advert.flat.size} {advert.flat.measurementUnit}
              </Text>
            </View>

            <MatchingScoreButton size="Big" score={advert.matchScore ?? 5} />
          </View>
          {advert.flat.district && (
            <Text
              style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
              {advert.flat.district}, {advert.flat.city}
            </Text>
          )}
        </View>
        <View style={styles.chipContainer}>
          <Chips tags={featuresTags.positiveTags} features={true} />
          <Chips tags={characteristicsTags.positiveTags} features={false} />
        </View>
      </View>
      <CoreButton
        value="View flat"
        onPress={() => navigation.navigate('flatShow', {id: advert.id})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginBottom: size(18),
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
  },
  flatCardbuttonsWrap: {
    flex: 1,
    alignItems: 'flex-end',
    padding: size(15),
  },
  flatCardInfoWrap: {
    padding: size(8),
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
  apartmentMonthlyRentSize: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(20),
  },
  flatCardMetadataLocation: {
    color: Color.Black[50],
  },
  chipContainer: {
    marginTop: size(10),
  },
});

export default ListViewFlatCard;
