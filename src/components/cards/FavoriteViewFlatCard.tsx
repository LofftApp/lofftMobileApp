import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
// Redux 🏗️
import {
  useApplyForFlatMutation,
  useToggleFavoriteMutation,
} from 'reduxFeatures/adverts/advertApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';
import Chips from 'components/buttons/Chips';
import MatchingScoreButton from 'components/buttons/MatchingScoreButton';
import HeartButton from 'components/buttons/HeartButton';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Assets 🪴
import LofftHeaderPhoto from './LofftHeaderPhoto';

// Helpers
import {tagSorter} from 'helpers/tagSorter';

// Types 🏷️
import {FavoritesScreenNavigationProp} from '../../navigationStacks/types';
import {Favorite} from 'reduxFeatures/adverts/types';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

const FavoriteViewFlatCard = ({favorite}: {favorite: Favorite}) => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  const {data: currentUser} = useGetUserQuery();

  const [toggleFavorite] = useToggleFavoriteMutation();

  const [
    applyForFlat,
    {isSuccess: applyIsSuccess, isLoading: applyIsLoading, error: applyError},
  ] = useApplyForFlatMutation();

  // useEffect(() => {
  //   if (applyIsSuccess) {
  //     navigation.navigate('ApplyForFlatScreen');
  //   }
  // }, [applyIsSuccess, navigation]);
  const greenButtonHeight = useRef(new Animated.Value(0)).current; // Animation for button height
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state

  useEffect(() => {
    if (applyIsSuccess && isAnimating) {
      // Animate green button
      Animated.timing(greenButtonHeight, {
        toValue: 50, // Height of the green button
        duration: 1000, // Duration of the animation
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          navigation.navigate('ApplyForFlatScreen'); // Navigate after animation
        }, 2000); // Small delay before navigation
      });
    }
  }, [applyIsSuccess, navigation, greenButtonHeight, isAnimating]);

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
    setIsAnimating(true);
    applyForFlat(favorite?.id ?? 0);
  };
  return (
    <View style={styles.flatCardContainer}>
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

      <Animated.View
        style={[
          styles.greenButton,
          {
            height: greenButtonHeight, // Green button height animation
            overflow: 'hidden',
          },
        ]}>
        <Text style={styles.greenButtonText}>Applied</Text>
      </Animated.View>

      {!isAnimating && (
        <CoreButton
          value={
            favorite?.applied ? (
              'Applied'
            ) : applyIsLoading ? (
              <LoadingButtonIcon />
            ) : applyError ? (
              'Error. Try Again'
            ) : (
              'Apply'
            )
          }
          onPress={handleApplyForFlat}
        />
      )}
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

  greenButton: {
    backgroundColor: Color.Mint[100], // Use your green color
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenButtonText: {
    color: Color.White[100],
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoriteViewFlatCard;
