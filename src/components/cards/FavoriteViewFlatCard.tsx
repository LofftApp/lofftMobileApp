import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Redux 🏗️
import {
  useApplyForFlatMutation,
  useToggleFavoriteMutation,
} from 'reduxFeatures/adverts/advertApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Hooks  🪝
import useColorAnimation from 'hooks/useColorAnimation';
// Components 🪢
import Chips from 'components/buttons/Chips';
import MatchingScoreButton from 'components/buttons/MatchingScoreButton';
import HeartButton from 'components/buttons/HeartButton';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Assets 🪴
import LofftHeaderPhoto from './LofftHeaderPhoto';

// Helpers
import {tagSorter} from 'helpers/tagSorter';
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import {FavoritesScreenNavigationProp} from '../../navigationStacks/types';
import {Favorite} from 'reduxFeatures/adverts/types';

const FavoriteViewFlatCard = ({favorite}: {favorite: Favorite}) => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  const {data: currentUser} = useGetUserQuery();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [
    applyForFlat,
    {isSuccess: applyIsSuccess, isLoading: applyIsLoading, error: applyError},
  ] = useApplyForFlatMutation();

  // Color animation
  const [buttonColor, setButtonColor] = useState(Color.Lavendar[100]);
  const [animatedColor, finished] = useColorAnimation(buttonColor) as [
    Animated.AnimatedInterpolation<string | number>,
    boolean,
  ];

  // Fade animation
  const [isApplied, setIsApplied] = useState(false);
  const cardOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (applyIsSuccess) {
      setIsApplied(true);
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        const timeout = setTimeout(() => {
          setIsApplied(favorite?.applied);
        }, 2000);
        return () => {
          clearTimeout(timeout);
        };
      });
    }
  }, [applyIsSuccess, navigation, cardOpacity, favorite?.applied]);

  const characteristicsTags = tagSorter(
    currentUser?.profile.characteristics ?? [],
    favorite.flat.characteristics ?? [],
  );
  const featuresTags = tagSorter(
    currentUser?.profile.filter ?? [],
    favorite.flat.features,
  );
  const positiveFeatures = featuresTags.positiveTags;
  const positiveChars = characteristicsTags.positiveTags;

  const handleFavorite = () => {
    toggleFavorite(favorite.id ?? 0);
  };

  const handleApplyForFlat = () => {
    applyForFlat(favorite?.id ?? 0);
    setButtonColor(Color.Mint[100]);
  };
  if (favorite.applied) {
    return null;
  }

  console.log('favorite', favorite.applied);

  return (
    <Animated.View style={[styles.flatCardContainer, {opacity: cardOpacity}]}>
      <View style={styles.flatCardButtonsOverlay}>
        <View style={styles.flatCardbuttonsWrap}>
          {/* favorite button /> */}
          <HeartButton favorite={favorite.favorite} onPress={handleFavorite} />
        </View>
      </View>
      {/* flat image */}
      <View style={styles.flatCardImage}>
        <LofftHeaderPhoto
          imageContainerHeight={size(300)}
          images={favorite.flat.photos ?? []}
        />
      </View>
      <View style={styles.flatCardInfoContainer}>
        <View style={styles.flatDetailsContainer}>
          <View style={styles.flatMonthlyRentSizeContainer}>
            <Text style={[fontStyles.headerSmall]}>
              {favorite.monthlyRent} €
            </Text>
            <Text style={[fontStyles.headerSmall]}>
              {favorite.flat.size} {favorite.flat.measurementUnit}
            </Text>
          </View>

          <MatchingScoreButton size="Big" score={favorite.matchScore ?? 5} />
        </View>
        <View style={styles.taglineDistrictContainer}>
          <Text style={[fontStyles.headerExtraSmall, {color: Color.Black[80]}]}>
            {favorite.flat.tagLine}
          </Text>
          <Text style={[fontStyles.bodySmall, styles.flatLocation]}>
            {favorite.flat.district}, {favorite.flat.city}
          </Text>
        </View>

        <View style={styles.chipContainer}>
          <Chips tags={positiveFeatures} features={true} />
          <Chips tags={positiveChars} features={false} />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleApplyForFlat}
        disabled={!finished || favorite?.applied}>
        <Animated.View
          style={[styles.animatedButton, {backgroundColor: animatedColor}]}>
          <Text style={[fontStyles.headerSmall, styles.greenButtonText]}>
            {isApplied ? (
              'Applied'
            ) : applyIsLoading ? (
              <LoadingButtonIcon />
            ) : applyError ? (
              'Error. Try again'
            ) : (
              'Apply'
            )}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
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

  taglineDistrictContainer: {
    gap: size(2),
    marginTop: size(-2),
  },
  flatLocation: {
    color: Color.Black[50],
  },
  chipContainer: {
    marginTop: size(10),
  },

  greenButtonText: {
    color: Color.White[100],
  },
  animatedButton: {
    borderRadius: 12,
    paddingHorizontal: size(16),
    paddingVertical: size(12),
    alignItems: 'center',
    justifyContent: 'center',
    height: size(56),
  },
});

export default FavoriteViewFlatCard;
