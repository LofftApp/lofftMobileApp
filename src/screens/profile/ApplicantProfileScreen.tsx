/* React Stuff */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

/* Redux Api Calls etc */
import {getSpecificUserProfile} from 'reduxFeatures/user/usersMiddleware';

/* Components */
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import HighlightButtons from 'components/containers/HighlightButtons';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Chips from 'components/buttons/Chips';
import {CoreButton} from 'components/buttons/CoreButton';

/* Helpers */
import {matchMaker} from 'helpers/matchMaker';
import {capitalize} from 'helpers/capitalize';

/* Styles */
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Types
import type {ApplicantProfileScreenProps} from './types';
import {size} from 'react-native-responsive-sizes';

const images = [
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4524.jpg.webp',
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4286.jpg.webp',
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4203.jpg.webp',
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-3849.jpg.webp',
];

const ApplicantProfileScreen = ({route}: ApplicantProfileScreenProps) => {
  const {
    applicantName,
    handleClickCheckbox,
    secondRoundProfile,
    currentAdvert,
  } = route.params;

  const {characteristics: flatChars} = currentAdvert.flat;
  const {secondRoundSelected, id: applicantId} = secondRoundProfile;

  const [profileDetails, setProfileDetails] = useState({});
  const [profileChars, setProfileChars] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(secondRoundSelected);

  const matches = matchMaker(flatChars, profileChars)[0];
  const noMatches = matchMaker(flatChars, profileChars)[1];

  // Not working 👇
  useEffect(() => {
    const apiCallToRetriveUser = getSpecificUserProfile(applicantId ?? 1);

    apiCallToRetriveUser.then((result: any) => {
      setProfileDetails(result.data.profile_details);
      setProfileChars(result.data.profile_characteristics);
    });
  }, [applicantId]);

  const handleButtonClicked = () => {
    setButtonClicked(!buttonClicked);
    handleClickCheckbox();
  };

  return (
    <View style={styles.container}>
      <View>
        <LofftHeaderPhoto images={images} imageContainerHeight={400} />
        <HighlightButtons heartPresent={false} />
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.infoA}>
            <Text style={fontStyles.headerMedium}>
              {capitalize(applicantName)}
            </Text>
            <Text style={{color: Color.Black[80]}}>28 years old</Text>
          </View>

          <View style={styles.infoB}>
            <LofftIcon name="calendar" size={25} color={Color.Black[30]} />
            <Text style={[fontStyles.headerSmall, styles.calendarText]}>
              From: 25/12/22 - unlimited
            </Text>
          </View>

          <View style={styles.infoC}>
            <LofftIcon name="translate" size={25} color={Color.Black[30]} />
            <Text style={[fontStyles.headerSmall, styles.translateText]}>
              English, German, Arabic
            </Text>
          </View>

          <View>
            <Text style={[fontStyles.bodySmall, {color: Color.Black[80]}]}>
              {/* will display when apiCallToRetriveUser is fixed  */}
              {/* {profileDetails.description} */}
            </Text>
          </View>

          <Text style={[fontStyles.headerMedium, styles.matchText]}>
            Match with you
          </Text>
          <Chips tags={matches} features={true} emoji />

          <Text style={[fontStyles.headerMedium, styles.differencesText]}>
            Differences
          </Text>
          <Chips tags={noMatches} features={true} emoji />

          {/* {profileChars.map((el, index) => <Text key={index}>{el.name}</Text>)} */}
        </View>
      </ScrollView>
      <View style={styles.centerButtonContainer}>
        <CoreButton
          value={buttonClicked ? 'Selected !' : '+ Add to selection'}
          style={[
            styles.customCoreButtonStyle,
            buttonClicked ? styles.selected : null,
          ]}
          onPress={() => handleButtonClicked()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userImage: {
    width: '100%',
    height: size(400),
  },
  contentContainer: {
    padding: size(12),
  },
  infoA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoB: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: size(10),
    paddingTop: size(10),
  },
  infoC: {
    paddingBottom: size(20),
    flexDirection: 'row',
  },
  centerButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 5,
  },
  customCoreButtonStyle: {
    width: '94%',
    margin: 0,
  },
  selected: {
    backgroundColor: Color.Mint[100],
    borderColor: Color.Mint[100],
  },
  calendarText: {color: Color.Black[100], paddingLeft: size(10)},
  translateText: {color: Color.Black[100], paddingLeft: size(10)},
  matchText: {color: Color.Black[100], paddingTop: size(20)},
  differencesText: {color: Color.Black[100], paddingTop: size(10)},
});

export default ApplicantProfileScreen;
