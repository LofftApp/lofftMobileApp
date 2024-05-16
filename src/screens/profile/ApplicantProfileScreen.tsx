/* React Stuff */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/* Redux Api Calls etc */
import {getSpecificUserProfile} from '@Redux/user/usersMiddleware';

/* Components */
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import HighlightButtons from 'components/containers/HighlightButtons';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Chips from 'components/buttons/Chips';
import {CoreButton} from 'components/buttons/CoreButton';

/* Helpers */
import {matchMaker} from '@Helpers/matchMaker';

/* Styles */
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const ApplicantProfileScreen = ({route}: any) => {
  const navigation = useNavigation();
  const {
    firstName,
    characteristics,
    selectedProfile,
    currentAdvert,
    selectProfilesFunc,
  } = route.params;

  const [profileDetails, setProfileDetails] = useState({});
  const [profileChars, setProfileCharts] = useState([]);
  const [clicked, setClicked] = useState(selectedProfile.selected);

  const images = [
    'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4524.jpg.webp',
    'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4286.jpg.webp',
    'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4203.jpg.webp',
    'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-3849.jpg.webp',
  ];

  const landlordChars = characteristics;
  const matches = matchMaker(landlordChars, profileChars)[0];
  const noMatches = matchMaker(landlordChars, profileChars)[1];

  useEffect(() => {
    const apiCallToRetriveUser = getSpecificUserProfile(selectedProfile.userId);

    apiCallToRetriveUser.then((result: any) => {
      setProfileDetails(result.data.profile_details);
      setProfileCharts(result.data.profile_characteristics);
    });
  }, []);

  const capitalize = word => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  };

  const selectUser = id => {
    setClicked(!clicked);
    selectProfilesFunc(id);
  };

  return (
    <View style={styles.container}>
      <View>
        <LofftHeaderPhoto images={images} imageContainerHeight={400} />
        <HighlightButtons navigation={navigation} heartPresent={false} />
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.infoA}>
            <Text style={fontStyles.headerMedium}>
              {capitalize(firstName.split('@')[0])}
            </Text>
            <Text style={{color: Color.Black[80]}}>28 years old</Text>
          </View>

          <View style={styles.infoB}>
            <LofftIcon name="calendar" size={25} color={Color.Black[30]} />
            <Text
              style={[
                fontStyles.headerSmall,
                {color: Color.Black[100], paddingLeft: 10},
              ]}>
              From: 25/12/22 - unlimited
            </Text>
          </View>

          <View style={styles.infoC}>
            <LofftIcon name="translate" size={25} color={Color.Black[30]} />
            <Text
              style={[
                fontStyles.headerSmall,
                {color: Color.Black[100], paddingLeft: 10},
              ]}>
              English, German, Arabic
            </Text>
          </View>

          <View>
            <Text style={[fontStyles.bodySmall, {color: Color.Black[80]}]}>
              {profileDetails.description}
            </Text>
          </View>

          <Text
            style={[
              fontStyles.headerMedium,
              {color: Color.Black[100], paddingTop: 20},
            ]}>
            Match with you
          </Text>
          <Chips tags={matches} features={true} emoji />

          <Text
            style={[
              fontStyles.headerMedium,
              {color: Color.Black[100], paddingTop: 10},
            ]}>
            Differences
          </Text>
          <Chips tags={noMatches} features={true} emoji />

          {/* {profileChars.map((el, index) => <Text key={index}>{el.name}</Text>)} */}
        </View>
      </ScrollView>
      <View style={styles.centerButtonContainer}>
        <CoreButton
          value={clicked ? 'Selected !' : '+ Add to selection'}
          style={[
            styles.customCoreButtonStyle,
            clicked ? styles.selected : null,
          ]}
          onPress={() => {
            selectUser(selectedProfile.userId);
          }}
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
    height: 400,
  },
  contentContainer: {
    padding: 12,
  },
  infoA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoB: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  infoC: {
    paddingBottom: 20,
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
});

export default ApplicantProfileScreen;
