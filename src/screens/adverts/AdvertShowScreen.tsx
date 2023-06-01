/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {toggleFavorite} from '@Redux/adverts/advertMiddleware';

// Components
import HighlightedButtons from '@Components/containers/HighlightButtons';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';
import CompleteProfileImage from '@Assets/images/Illustration.png';
import FlatInfoContainer from '@Components/containers/FlatInfoContainer';
import CompleteProfilePopUpModal from '@Components/modals/CompleteProfilePopUpModal';

// Helpers
import {tagSorter} from '@Helpers/tagSorter';

const AdvertShowScreen = ({route, navigation}: any) => {
  const [advert] = useState(route.params.advert);
  const userProfile = useAppSelector((state: any) => state.user.user);

  const characteristicsTags = tagSorter(
    userProfile.profile.characteristics,
    advert.flat.characteristics,
  );

  const featuresTags = tagSorter(userProfile.filter, advert.flat.features);

  const dispatch = useAppDispatch();

  // if (userType === 'renter') {
  //   save = useAppSelector(state => state.user.savedFlats.includes(flat.flatId));
  // }

  /* Params are being passed classicly via the route helper instead of  */

  //This is a placeholder for the CompleteProfileStep
  const [completeProfile, setCompleteProfile] = useState(false);

  //Placeholder for if Out of Tokens
  const [outOfTokens, setOutOfTokens] = useState(true);

  //Modal
  const [descriptionExpanded, setDescriptionExpansion] = useState(false);
  const [blurActivated, setBlurActivated] = useState(false);
  const expander = () => {
    setDescriptionExpansion(!descriptionExpanded);
  };

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

  const pullData = (data: any) => {
    setBlurActivated(data);
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View>
          {!blurActivated ? (
            <HighlightedButtons
              navigation={navigation}
              favorite={advert.favorite}
              onPressHeart={() => dispatch(toggleFavorite(advert.id))}
            />
          ) : null}
          <LofftHeaderPhoto
            imageContainerHeight={300}
            images={advert.flat.photos}
            activeBlur={blurActivated}
          />
        </View>
        <SafeAreaView
          style={{backgroundColor: Color.White[100], alignItems: 'center'}}>
          <View style={styles.flatCardView}>
            <FlatInfoContainer
              advert={advert}
              navigation={navigation}
              button={true}
              chips={{
                features:
                  featuresTags !== null ? featuresTags : advert.flat.features,
                characteristics:
                  characteristicsTags !== null
                    ? characteristicsTags
                    : advert.flat.characteristics,
              }}
            />
            {/* <View>
                {completeProfile && !outOfTokens ? (
                  <CoreButton
                    value="Apply"
                    style={styles.applyCoreButton}
                    disabled={false}
                    onPress={() => navigation.navigate('applyforflat')}
                  />
                ) : (
                  <CoreButton
                    value="Apply"
                    style={styles.applyCoreButton}
                    disabled={false}
                    onPress={() => pullData(true)}
                  />
                )}
              </View> */}
            <CompleteProfilePopUpModal
              openModal={blurActivated}
              pullData={pullData}
              profileNotDoneObject={
                completeProfile && outOfTokens
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
    paddingBottom: 10,
    width: '100%',
  },
  flatCardView: {
    width: '90%',
    alignContent: 'center',
    marginHorizontal: 16,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Color.White[100],
  },
  imageContainer: {
    height: 300,
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
    width: '90%',
    backgroundColor: Color.Mint[10],
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    marginTop: 15,
  },
  LegendContainer: {
    width: '90%',
    marginTop: 10,
  },
  firstRowLegendContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
    borderRadius: 10,
  },
  completeProfileContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  applyCoreButton: {
    borderWidth: 2,
    marginTop: 14,
    height: 45,
    marginBottom: 30,
  },
});

export default AdvertShowScreen;
