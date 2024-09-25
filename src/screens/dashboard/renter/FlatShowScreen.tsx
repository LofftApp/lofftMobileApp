import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
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
import CompleteProfileImage from 'Assets/images/Illustration.png';
import FlatInfoSubScreen from './SubScreens/FlatInfoSubScreen';
import CompleteProfilePopUpModal from 'components/modals/CompleteProfilePopUpModal';
import {CoreButton} from 'components/buttons/CoreButton';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';

// Helpers 🥷🏻
import {height, size} from 'react-native-responsive-sizes';

// Types 🏷️
import type {FlatShowScreenProp} from './types';
import {SearchScreenNavigationProp} from '../../../../navigationStacks/types';

const profileNotDoneObject = {
  header: "Your application profile isn't complete",
  description:
    'To apply for this flat, please go to the profile section and complete your application. This takes only 5 minutes!',
  icon: CompleteProfileImage,
};
const outOfTokensObject = {
  header: 'Why are tokens limited?',
  description:
    "We're passionate about fair flat searches! Each user can have up to 10 active applications at a time, but withdrawing one is easy. Relax and wait for the post owner to notify you of the result within 48 hours. Let's make finding your dream flat an equal opportunity for all!",
  icon: CompleteProfileImage,
};

const FlatShowScreen = ({route}: FlatShowScreenProp) => {
  const {advertId} = route.params;
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const {data: advert, error, isLoading} = useGetAdvertByIdQuery(advertId);
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [
    applyForFlat,
    {isSuccess: applyIsSuccess, isLoading: applyIsLoading, error: applyError},
  ] = useApplyForFlatMutation();

  // //Placeholder for complete profile and has tokens
  const completeProfile = false;
  const hasTokens = true;

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
    <View style={styles.pageContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
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
        <SafeAreaView style={styles.safeAreaContainer}>
          {isModalOpen && <View style={styles.blurOverlay} />}

          <View style={styles.flatCardView}>
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

            <CompleteProfilePopUpModal
              openModal={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              profileNotDoneObject={
                !completeProfile
                  ? profileNotDoneObject
                  : !hasTokens
                  ? outOfTokensObject
                  : profileNotDoneObject
              }
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  flatCardView: {
    width: '100%',
    alignContent: 'center',
    marginHorizontal: size(16),
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Color.White[100],
  },
  safeAreaContainer: {backgroundColor: Color.White[100], alignItems: 'center'},
  imageContainer: {
    height: height(300),
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  centralizerContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchContainer: {
    width: '100%',
    backgroundColor: Color.Mint[10],
    marginVertical: size(10),
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: size(20),
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    marginTop: size(15),
  },
  LegendContainer: {
    width: '90%',
    marginTop: size(10),
  },
  firstRowLegendContainer: {
    flexDirection: 'row',
    marginBottom: size(10),
  },
  secondRowLegendContainer: {
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  modalContainer: {
    height: '64%',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: size(10),
  },
  completeProfileContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: size(16),
    paddingBottom: size(80),
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    paddingHorizontal: size(20),
    width: '100%',
    marginTop: size(10),
    marginBottom: size(10),
  },
  applyCoreButton: {
    borderWidth: size(2),
    marginTop: size(14),
    height: height(45),
    marginBottom: size(100),
  },
  countDownTimer: {
    textAlign: 'center',
    color: Color.Mint[100],
  },
  coreButtonCustom: {
    marginTop: size(14),
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
