import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🏗️
import {
  useApplyForFlatMutation,
  useGetAdvertByIdQuery,
  useToggleFavoriteMutation,
} from 'reduxFeatures/adverts/advertApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components
import HighlightedButtons from 'components/containers/HighlightButtons';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import {Looking} from 'assets';
import FlatInfoSubScreen from './SubScreens/FlatInfoSubScreen';
import ConfirmModal from 'components/modals/ConfirmModal';
import {CoreButton} from 'components/buttons/CoreButton';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

//StyleSheets 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import type {FlatShowScreenProp} from './types';
import {SearchScreenNavigationProp} from '../../../navigationStacks/types';
import useColorAnimation from 'hooks/useColorAnimation';

const profileNotDone = {
  header: "Your application profile isn't complete",
  description:
    'To apply for this flat, please go to the profile section and complete your application. This takes only 5 minutes!',
  buttonText: {
    first: 'Complete my profile now',
    second: 'Do it later',
  },
};
const outOfTokens = {
  header: 'Why are tokens limited?',
  description:
    "We're passionate about fair flat searches! Each user can have up to 10 active applications at a time, but withdrawing one is easy. Relax and wait for the post owner to notify you of the result within 48 hours. Let's make finding your dream flat an equal opportunity for all!",
  buttonText: {
    first: 'Get more tokens',
    second: 'Back to search',
  },
};

const FlatShowScreen = ({route}: FlatShowScreenProp) => {
  const {advertId} = route.params;
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const {data: currentUser} = useGetUserQuery();

  const {data: advert, error, isLoading} = useGetAdvertByIdQuery(advertId);
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [
    applyForFlat,

    {isSuccess: applyIsSuccess, isLoading: applyIsLoading, error: applyError},
  ] = useApplyForFlatMutation();
  console.log('applyIsLoading', applyIsLoading);

  const completeProfile = currentUser?.userType !== 'newuser';
  const hasTokens = currentUser?.credits && currentUser?.credits > 0;

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local state
  const [isApplied, setIsApplied] = useState(false);
  const [buttonColor, setButtonColor] = useState(Color.Lavendar[100]); // Default color
  const [animatedColor, finished] = useColorAnimation(buttonColor) as [
    Animated.AnimatedInterpolation<string | number>,
    boolean,
  ];
  //navigate to the next screen if applyForFlat is successful
  useEffect(() => {
    if (applyIsSuccess) {
      setIsApplied(true);
      const timeout = setTimeout(() => {
        navigation.navigate('ApplyForFlatScreen');
      }, 1000);
      const timeout2 = setTimeout(() => {
        setIsApplied(advert?.applied || false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      };
    }
  }, [applyIsSuccess, navigation, advert?.applied]);

  const handleFavorite = () => {
    toggleFavorite(advert?.id ?? 0);
  };

  const handleApplyForFlat = () => {
    applyForFlat(advert?.id ?? 0);
    setButtonColor(Color.Mint[100]);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <NotFoundComponent message="There was an error getting this flat" />;
  }

  return (
    <View style={CoreStyleSheet.showContainer}>
      <View>
        {!isModalOpen && (
          <HighlightedButtons
            favorite={advert?.favorite}
            onPressHeart={handleFavorite}
          />
        )}
        <LofftHeaderPhoto
          imageContainerHeight={size(300)}
          images={advert?.flat.photos ?? []}
          activeBlur={isModalOpen}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.flatCardContainer}>
          {advert && <FlatInfoSubScreen advert={advert} />}

          <View style={styles.buttonContainer}>
            <Text style={[fontStyles.bodySmall, styles.countDownTimer]}>
              Application closing in 1d 8h
            </Text>

            {completeProfile && hasTokens ? (
              <TouchableOpacity
                onPress={handleApplyForFlat}
                disabled={!finished || advert?.applied}>
                <Animated.View
                  style={[
                    styles.animatedButton,
                    {backgroundColor: animatedColor},
                    advert?.applied ? styles.buttonDisabled : null,
                  ]}>
                  <Text
                    style={[fontStyles.headerSmall, styles.greenButtonText]}>
                    {advert?.applied || isApplied ? (
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
            ) : (
              <CoreButton
                value={advert?.applied ? 'Applied' : 'Apply'}
                style={styles.coreButtonCustom}
                disabled={advert?.applied}
                onPress={() => setIsModalOpen(true)}
              />
            )}
          </View>

          <ConfirmModal
            openModal={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalAsset={
              !completeProfile
                ? profileNotDone
                : !hasTokens
                ? outOfTokens
                : profileNotDone
            }
            image={<Looking />}
            onPressFirstButton={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    width: '100%',
    paddingHorizontal: size(16),
    alignItems: 'center',
  },

  buttonContainer: {
    width: '100%',
    marginTop: size(10),
    marginBottom: size(10),
  },

  countDownTimer: {
    textAlign: 'center',
    color: Color.Mint[100],
    marginBottom: size(10),
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
  coreButtonCustom: {
    marginTop: size(14),
    width: '100%',
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

export default FlatShowScreen;
