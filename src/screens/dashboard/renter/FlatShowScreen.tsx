import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🏗️
import {
  useApplyForFlatMutation,
  useGetAdvertByIdQuery,
  useToggleFavoriteMutation,
} from 'reduxFeatures/adverts/advertApi';

// Components
import HighlightedButtons from 'components/containers/HighlightButtons';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import {Search} from 'assets';
import FlatInfoSubScreen from './SubScreens/FlatInfoSubScreen';
import ConfirmModal from 'components/modals/ConfirmModal';
import {CoreButton} from 'components/buttons/CoreButton';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';

//StyleSheets 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import type {FlatShowScreenProp} from './types';
import {SearchScreenNavigationProp} from '../../../../navigationStacks/types';
import {useAppSelector} from 'reduxCore/hooks';

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
  const userCredits = useAppSelector(state => state.user.user.credits);
  console.log('user credits', userCredits);

  const {data: advert, error, isLoading} = useGetAdvertByIdQuery(advertId);
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [
    applyForFlat,

    {
      isSuccess: applyIsSuccess,
      isLoading: applyIsLoading,
      error: applyError,
      data: applyData,
    },
  ] = useApplyForFlatMutation();

  console.log('applyData', applyData);

  // //Placeholder for complete profile and has tokens
  const completeProfile = true;
  const hasTokens = userCredits && userCredits < 0;

  // //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //navigate to the next screen if applyForFlat is successful
  useEffect(() => {
    if (applyIsSuccess) {
      navigation.navigate('applyforflat');
    }
  }, [applyIsSuccess, navigation]);

  const handleFavorite = () => {
    toggleFavorite(advert?.id ?? 0);
  };

  const handleApplyForFlat = () => {
    applyForFlat(advert?.id ?? 0);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message="There was an error getting this flat" />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {!isModalOpen && (
          <HighlightedButtons
            favorite={advert?.favorite}
            onPressHeart={handleFavorite}
          />
        )}
        <LofftHeaderPhoto
          imageContainerHeight={300}
          images={advert?.flat.photos ?? []}
          activeBlur={isModalOpen}
        />
      </View>
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        {isModalOpen && <View style={styles.blurOverlay} />}

        <View style={styles.flatCardContainer}>
          {advert && <FlatInfoSubScreen advert={advert} />}

          <View style={styles.buttonContainer}>
            <Text style={[fontStyles.bodySmall, styles.countDownTimer]}>
              Application closing in 1d 8h
            </Text>

            {completeProfile && hasTokens ? (
              <CoreButton
                value={
                  advert?.applied
                    ? 'Applied'
                    : applyIsLoading
                    ? 'Applying'
                    : applyError
                    ? 'Error. Try Again'
                    : 'Apply'
                }
                style={styles.coreButtonCustom}
                disabled={advert?.applied || applyIsLoading || applyIsSuccess}
                onPress={handleApplyForFlat}
              />
            ) : (
              <CoreButton
                value={advert?.applied ? 'Applied' : 'Applyuuuu'}
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
            image={<Search />}
            onPressFirstButton={() => {}}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
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
  },
  coreButtonCustom: {
    marginTop: size(14),
    width: '100%',
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
});

export default FlatShowScreen;
