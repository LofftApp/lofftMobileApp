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

//Constants
import {MAX_SELECT_ROUND2} from 'components/componentData/constants';
// Types
import type {LessorNavigatorScreenNavigationProp} from '../../navigationStacks/types';
import {ApplicantCardRound2Props} from './types';

const ApplicantCardRound2 = ({
  currentSelectedNums,
  selectApplication,
  application,
}: ApplicantCardRound2Props) => {
  const applicant = application.applicant;
  console.log('applicant', applicant);

  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  const {width} = useWindowDimensions();

  if (!applicant) {
    return null;
  }

  const toggleCheckbox = () => {
    if (currentSelectedNums >= MAX_SELECT_ROUND2) {
      if (application.round2) {
        selectApplication(application.id);
      }
    } else {
      selectApplication(application.id);
    }
  };

  const handleNavigate = () => {
    navigation.navigate('ApplicantProfileScreen', {
      advertId: application.advertId,
      applicantId: application.applicantId,
      applicationId: application.id,
    });
  };

  return (
    <View style={[styles.outterContainer, {width: width - 30}]}>
      <View style={[styles.innerContainer]}>
        <CheckBox
          value={application.round2}
          disabled={
            !application.round2 && currentSelectedNums >= MAX_SELECT_ROUND2
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
            {applicant.profile.firstName &&
              capitalize(applicant.profile.firstName)}
          </Text>
          <Text style={fontStyles.bodySmall}>
            🌟 {applicant.matchScore}% match
          </Text>
        </View>
        <Pressable style={styles.iconContainer} onPress={handleNavigate}>
          <LofftIcon name="chevron-right" size={35} color={Color.Blue[80]} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ApplicantCardRound2;
