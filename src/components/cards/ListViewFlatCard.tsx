import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
// Redux 🏗️
import {useToggleFavoriteMutation} from 'reduxFeatures/adverts/advertApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

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

// Helpers
import {tagSorter} from 'helpers/tagSorter';

// Types 🏷️
import type {Advert} from 'reduxFeatures/adverts/types';
import {SearchScreenNavigationProp} from '../../../navigationStacks/types';

const ListViewFlatCard = ({advert}: {advert: Advert}) => {
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const {data} = useGetUserQuery();
  const currentUser = data?.user;

  const [toggleFavorite] = useToggleFavoriteMutation();

  const characteristicsTags = tagSorter(
    currentUser?.profile.characteristics ?? [],
    advert.flat.characteristics ?? [],
  );
  const featuresTags = tagSorter(
    currentUser?.filter ?? [],
    advert.flat.features,
  );
  const positiveFeatures = featuresTags.positiveTags;
  const positiveChars = characteristicsTags.positiveTags;

  const handleFavorite = () => {
    toggleFavorite(advert.id ?? 0);
  };

  return (
    <View style={styles.flatCardContainer}>
      {/* favorite button /> */}
      <View style={styles.flatCardButtonsOverlay}>
        <View style={styles.flatCardbuttonsWrap}>
          <Pressable onPress={handleFavorite}>
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
      </View>
      {/* flat image */}
      <View style={styles.flatCardImage}>
        <LofftHeaderPhoto
          imageContainerHeight={size(300)}
          images={advert.flat.photos ?? []}
        />
      </View>
      <View style={styles.flatCardInfoContainer}>
        <View style={styles.flatDetailsContainer}>
          <View style={styles.flatMonthlyRentSizeContainer}>
            <Text style={[fontStyles.headerSmall]}>{advert.monthlyRent} €</Text>
            <Text style={[fontStyles.headerSmall]}>
              {advert.flat.size} {advert.flat.measurementUnit}
            </Text>
          </View>

          <MatchingScoreButton size="Big" score={advert.matchScore ?? 5} />
        </View>
        {advert.flat.district && (
          <Text style={[fontStyles.bodySmall, styles.flatLocation]}>
            {advert.flat.district}, {advert.flat.city}
          </Text>
        )}

        <View style={styles.chipContainer}>
          <Chips tags={positiveFeatures} features={true} />
          <Chips tags={positiveChars} features={false} />
        </View>
      </View>
      <CoreButton
        value="View flat"
        onPress={() => navigation.navigate('flatShow', {advertId: advert.id})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginBottom: size(18),
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
  flatCardImage: {
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 12,
  },
  flatCardInfoContainer: {
    paddingVertical: size(8),
  },

  flatDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatMonthlyRentSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(20),
  },
  flatLocation: {
    color: Color.Black[50],
  },
  chipContainer: {
    marginTop: size(10),
  },
});

export default ListViewFlatCard;
