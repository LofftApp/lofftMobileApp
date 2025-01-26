import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Touchable,
  TouchableOpacity,
  Pressable,
} from 'react-native';
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
import useColorAnimation from 'hooks/useColorAnimation';

const FavoriteViewFlatCard = ({favorite}: {favorite: Favorite}) => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  console.log(' is applied', favorite.applied);
  const {data: currentUser} = useGetUserQuery();

  const [toggleFavorite] = useToggleFavoriteMutation();

  const [
    applyForFlat,
    {isSuccess: applyIsSuccess, isLoading: applyIsLoading, error: applyError},
  ] = useApplyForFlatMutation();

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
          // navigation.navigate('ApplyForFlatScreen');
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

  const [buttonColor, setButtonColor] = useState(Color.Lavendar[100]); // Default color
  const [animatedColor, finished] = useColorAnimation(buttonColor) as [
    Animated.AnimatedInterpolation<string | number>,
    boolean,
  ]; // Animated color
  const handleApplyForFlat = () => {
    applyForFlat(favorite?.id ?? 0);
    setButtonColor(Color.Mint[100]);
  };
  if (favorite.applied) {
    return null;
  }

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
      {/* {isAnimating ? (
        <Animated.View
          style={[
            styles.greenButton,
            {
              height: greenButtonHeight,
              opacity: greenButtonOpacity,
              // overflow: 'hidden',
            },
          ]}>
          <Text style={[fontStyles.headerSmall, styles.greenButtonText]}>
            Applied
          </Text>
        </Animated.View>
      ) : (
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
          // style={styles.coreButtonCustom}
        />
      )} */}
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
            {/* {applyIsLoading ? ( // Show spinner while loading
              <LoadingButtonIcon />
            ) : favorite?.applied ? ( // Show "Applied" after loading completes
              'Applied'
            ) : applyError ? ( // Show error message if there's an error
              'Error. Try Again'
            ) : (
              'Apply'
            )} */}
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

  greenButton: {
    backgroundColor: Color.Mint[100],
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: Color.Mint[100],
    borderRadius: 12,

    paddingHorizontal: size(16),
    borderWidth: size(2),
    flexDirection: 'row',
    gap: size(7),
    width: '100%',
    height: size(56),
    color: Color.White[100],
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
  buttonDisabled: {
    backgroundColor: Color.Black[30],
    borderColor: Color.Black[30],
  },
  textDisabled: {
    color: Color.White[100],
  },
});

export default FavoriteViewFlatCard;
