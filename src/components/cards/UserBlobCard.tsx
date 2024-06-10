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
import type {UserBlobCardProps} from './types';

const UserBlobCard = ({
  secondRoundProfile,
  currentAdvert,
  selectProfiles,
}: UserBlobCardProps) => {
  const {id, email, secondRoundSelected} = secondRoundProfile;
  const {characteristics} = currentAdvert.flat;
  const [clickCheckbox, setClickCheckbox] = useState(false);

  console.log('secondRoundSelecteduserblob:', secondRoundSelected);

  const navigation = useNavigation();

  const handleClickCheckbox = () => {
    console.log('handleClickCheckbox');
    setClickCheckbox(!clickCheckbox);
    selectProfiles(id);
  };

  const capitalize = (word: string | undefined) => {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.substring(1);
  };

  const applicantName = email?.split('@')[0];

  return (
    <View style={styles.blobContainer}>
      <CheckBox
        style={{marginLeft: 10}}
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
        title="Profile page"
        onPress={() =>
          navigation.navigate('ApplicantProfile', {
            secondRoundProfile: secondRoundProfile,
            applicantName: applicantName,
            clickCheckbox: clickCheckbox,
            handleClickCheckbox: handleClickCheckbox,
            currentAdvert: currentAdvert,
            selectProfilesFunc: selectProfiles,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blobContainer: {
    width: '95%',
    height: 120,
    padding: 7,
    backgroundColor: Color.Lavendar[10],
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 80,
    height: '80%',
    borderRadius: 8,
  },
});

export default UserBlobCard;
