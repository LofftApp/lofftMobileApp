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

  const user = useAppSelector((state: {user: UserState}) => state.user.user);

  const {profile, filter: userFilter} = user;
  const {characteristics: userCharacteristics} = profile;

  const {flat, matchScore, id, favorite, price} = advert;
  const {
    features: flatFeatures,
    characteristics: flatCharacteristics,
    photos,
    district,
    city,
  } = flat;

  console.log("flat ID>>>>>>>>>>>>>>>>>>", advert.flat.id)

  const characteristicsTags = tagSorter(
    userCharacteristics ?? [],
    flatCharacteristics ?? [],
  );
  const featuresTags = tagSorter(userFilter ?? [], flatFeatures ?? []);

  const dispatch = useAppDispatch();
  return (
    <View style={styles.flatCardContainer}>
      <View style={styles.flatCardButtonsOverlay}>
        <View style={styles.flatCardbuttonsWrap}>
          {matchScore && (
            <View>
              <Pressable
                // style={styles.flatCardSaveButton}
                onPress={() => {
                  dispatch(toggleFavorite(id ?? 0));
                }}>
                {favorite ? (
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
          {/* <HighlightedButtons navigation={navigation} id={flatId} goBack={false}  />  For refactoring above 👆*/}
        </View>
      </View>
      <View style={styles.flatCardImage}>
        <LofftHeaderPhoto
          imageContainerHeight={size(300)}
          images={photos ?? []}
        />
      </View>
      <View style={styles.flatCardInfoWrap}>
        <View style={styles.flatCardMetadataWrap}>
          <View style={styles.apartmentLocationInfo}>
            {/* Size of WG is not in DB - 26 m2 */}
            <Text style={[fontStyles.headerSmall]}>{advert.monthlyRent} €</Text>

            <MatchingScoreButton size="Big" score={matchScore ?? 0} />
          </View>
          {district && (
            <Text
              style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
              {district}, {city}
            </Text>
          )}
        </View>
        <View>
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
  flatCardMetadataLocation: {
    color: Color.Black[50],
  },
});

export default ListViewFlatCard;
