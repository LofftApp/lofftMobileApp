import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// External
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';

// Components
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Helpers
import {capitalize} from 'helpers/capitalize';
import {size} from 'react-native-responsive-sizes';

// Types
import type {UserBlobCardProps} from './types';
import type {LessorNavigatorScreenNavigationProp} from '../../../navigationStacks/types';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';
import {MAX_SELECT_2_ROUND} from 'screens/dashboard/landlord/SubScreens/SeeProfilesScreen';

const UserBlobCard = ({
  currentSelectedNums,
  selectApplication,
  application,
}: UserBlobCardProps) => {
  const applicant = application.applicant;
  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  const {width} = useWindowDimensions();

  if (!applicant) {
    return <ErrorComponent message="We could not find the applicants" />;
  }
  const {email} = applicant;

  const applicantName = email?.split('@')[0];

  const toggleCheckbox = () => {
    if (currentSelectedNums >= MAX_SELECT_2_ROUND) {
      if (application.round1) {
        selectApplication(application.id);
      }
    } else {
      selectApplication(application.id);
    }
  };

  const handleNavigate = () => {
    navigation.navigate('ApplicantProfile', {
      advertId: application.advertId,
      applicantId: application.applicantId,
      applicationId: application.id,
    });
  };

  return (
    // <View style={styles.blobContainer}>
    //   <CheckBox
    //     style={styles.checkbox}
    //     value={clickCheckbox}
    //     onPress={toggleCheckbox}
    //   />
    //   {/* hardecoded image url */}
    //   <Image
    //     style={styles.profilePic}
    //     source={{
    //       uri: 'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp',
    //     }}
    //   />
    //   <View>
    //     <Text style={fontStyles.headerMedium}>
    //       {applicantName ? capitalize(applicantName) : 'No name'}
    //     </Text>
    //     <Text style={fontStyles.bodyMedium}>🌟 98% Match</Text>
    //   </View>
    //   <LofftIcon
    //     name="chevron-right"
    //     size={35}
    //     color={Color.Blue[80]}
    //     onPress={() =>
    //       navigation.navigate('ApplicantProfile', {
    //         applicantName: applicantName,
    //         handleClickCheckbox: handleClickCheckbox,
    //         secondRoundProfile: secondRoundProfile,
    //         currentAdvert: currentAdvert,
    //       })
    //     }
    //   />
    // </View>

    <View style={[styles.outterContainer, {width: width - 30}]}>
      <View style={[styles.innerContainer]}>
        <CheckBox
          value={application.round2}
          disabled={
            !application.round2 && currentSelectedNums >= MAX_SELECT_2_ROUND
          }
          onPress={toggleCheckbox}
        />
        {/* hardecoded image url */}
        <Image
          style={styles.profilePic}
          source={{
            uri: 'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp',
          }}
        />
        <View>
          <Text style={fontStyles.headerSmall}>
            {applicantName ? capitalize(applicantName) : 'No name'}
          </Text>
          <Text style={fontStyles.bodySmall}>🌟 98% Match</Text>
        </View>
        <Pressable style={styles.iconContainer} onPress={handleNavigate}>
          <LofftIcon name="chevron-right" size={35} color={Color.Blue[80]} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // blobContainer: {
  //   width: '95%',
  //   height: size(120),
  //   padding: size(7),
  //   backgroundColor: Color.Lavendar[10],
  //   borderRadius: 12,
  //   marginBottom: 20,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },

  outterContainer: {
    backgroundColor: Color.Lavendar[10],
    borderRadius: 10,
    marginBottom: size(20),
    padding: size(15),
  },
  innerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: size(100),
  },
  profilePic: {
    width: '30%',
    height: '80%',
    borderRadius: 8,
  },
  checkbox: {marginLeft: 10},
  iconContainer: {
    padding: size(10),
  },
});

export default UserBlobCard;
