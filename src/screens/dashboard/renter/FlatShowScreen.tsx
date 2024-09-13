/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';

import Color from 'styleSheets/lofftColorPallet.json';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {
  applyForAdvert,
  toggleFavorite,
} from 'reduxFeatures/adverts/advertMiddleware';
import {fetchAdvertById} from 'reduxFeatures/adverts/advertMiddleware';

// Components
import HighlightedButtons from 'components/containers/HighlightButtons';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import CompleteProfileImage from 'Assets/images/Illustration.png';
import FlatInfoContainer from 'components/containers/FlatInfoContainer';
import CompleteProfilePopUpModal from 'components/modals/CompleteProfilePopUpModal';
import {CoreButton} from 'components/buttons/CoreButton';

// Helpers 🥷🏻
import {tagSorter} from 'helpers/tagSorter';
import {height, size} from 'react-native-responsive-sizes';

// Types 🏷️
import type {FlatShowScreenProp} from './types';
import type {UserState} from 'reduxFeatures/user/types';
import {fontStyles} from 'styleSheets/fontStyles';

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

const FlatShowScreen = ({route, navigation}: FlatShowScreenProp) => {
  const dispatch = useAppDispatch();
  const {id} = route.params;

  useEffect(() => {
    dispatch(fetchAdvertById(id));
  }, [dispatch, id]);

  const advert = useAppSelector(state => state.adverts.advert);

  const [completeProfile, setCompleteProfile] = useState(true);

  // //Placeholder for if Out of Tokens
  const [hasTokens, setHasTokens] = useState(true);

  // //Modal
  const [descriptionExpanded, setDescriptionExpansion] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [blurActivated, setBlurActivated] = useState(false);

  if (!advert) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView
          style={{
            backgroundColor: Color.White[100],
            alignItems: 'center',
          }}>
          <Text>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  const {flat} = advert;
  console.log('adevert ✈️✈️✈️', advert);

  const {
    characteristics: flatCharacteristics,
    features: flatFeatures,
    photos,
  } = flat;

  // const user = useAppSelector((state: {user: UserState}) => state.user.user);
  // const {profile, filter: userFilter} = user;
  // const {characteristics: userCharacteristics} = profile;

  // const characteristicsTags = tagSorter(
  //   userCharacteristics ?? [],
  //   flatCharacteristics ?? [],
  // );

  // const featuresTags = tagSorter(userFilter ?? [], flatFeatures ?? []);

  // if (userType === 'renter') {
  //   save = useAppSelector(state => state.user.savedFlats.includes(flat.flatId));
  // }

  /* Params are being passed classicly via the route helper instead of  */

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View>
          {!blurActivated && (
            <HighlightedButtons
              favorite={advert?.favorite}
              onPressHeart={() => dispatch(toggleFavorite(advert?.id))}
            />
          )}
          <LofftHeaderPhoto
            imageContainerHeight={300}
            images={photos ?? []}
            activeBlur={blurActivated}
          />
        </View>
        <SafeAreaView
          style={{backgroundColor: Color.White[100], alignItems: 'center'}}>
          <View style={styles.flatCardView}>
            {advert && <FlatInfoContainer advert={advert} button={true} />}

            <View>
              <Text style={[fontStyles.bodySmall, styles.countDownTimer]}>
                Application closing in 1d 8h
              </Text>

              <View>
                {completeProfile && hasTokens ? (
                  <CoreButton
                    value={advert.applied ? 'Applied' : 'Apply'}
                    style={styles.coreButtonCustom}
                    disabled={advert.applied}
                    onPress={() => {
                      dispatch(applyForAdvert(advert.id));
                      navigation.navigate('applyforflat', {
                        id: advert.id,
                      });
                    }}
                  />
                ) : (
                  <CoreButton
                    value="Applyuuuu"
                    style={styles.coreButtonCustom}
                    disabled={false}
                    onPress={() => setModalState(true)}
                  />
                )}
              </View>
            </View>

            <CompleteProfilePopUpModal
              openModal={modalState}
              setModalState={setModalState}
              profileNotDoneObject={
                !completeProfile
                  ? profileNotDoneObject
                  : !hasTokens
                  ? outOfTokensObject
                  : profileNotDoneObject
              }
            />
            {/* Continue coding from here !!!! */}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: size(10),
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
  applyCoreButton: {
    borderWidth: size(2),
    marginTop: size(14),
    height: height(45),
    marginBottom: size(100),
  },
  countDownTimer: {
    textAlign: 'center',
    color: Color.Mint[100],
    marginTop: size(20),
  },
  coreButtonCustom: {
    marginTop: size(14),
  },
});

export default FlatShowScreen;
