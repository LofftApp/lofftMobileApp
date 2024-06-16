import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {View, Text, StyleSheet, Image} from 'react-native';

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

const UserBlobCard = ({
  secondRoundProfile,
  currentAdvert,
  selectProfiles,
}: UserBlobCardProps) => {
  const {id, email} = secondRoundProfile;

  const [clickCheckbox, setClickCheckbox] = useState(false);

  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  const applicantName = email?.split('@')[0];

  const handleClickCheckbox = () => {
    setClickCheckbox(!clickCheckbox);
    selectProfiles(id);
  };

  return (
    <View style={styles.blobContainer}>
      <CheckBox
        style={styles.checkbox}
        value={clickCheckbox}
        onPress={() => handleClickCheckbox()}
      />
      <Image
        style={styles.profilePic}
        source={{
          uri: 'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp',
        }}
      />
      <View>
        <Text style={fontStyles.headerMedium}>
          {applicantName ? capitalize(applicantName) : 'No name'}
        </Text>
        <Text style={fontStyles.bodyMedium}>🌟 98% Match</Text>
      </View>
      <LofftIcon
        name="chevron-right"
        size={35}
        color={Color.Blue[80]}
        onPress={() =>
          navigation.navigate('ApplicantProfile', {
            applicantName: applicantName,
            handleClickCheckbox: handleClickCheckbox,
            secondRoundProfile: secondRoundProfile,
            currentAdvert: currentAdvert,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blobContainer: {
    width: '95%',
    height: size(120),
    padding: size(7),
    backgroundColor: Color.Lavendar[10],
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: size(80),
    height: '80%',
    borderRadius: 8,
  },
  checkbox: {marginLeft: 10},
});

export default UserBlobCard;
