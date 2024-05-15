import React, {useState} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// External
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';

// Components
import LofftIcon from 'components/lofftIcons/LofftIcon';

const UserBlobCard = ({
  id,
  selectProfiles,
  name,
  secondRoundselected,
  navigation,
  characteristics,
  currentAdvert,
}: any) => {
  const [activateBox, setActivateBox] = useState(secondRoundselected);

  const clickBox = () => {
    setActivateBox(!activateBox);
    selectProfiles(id);
  };

  const capitalize = (word: any) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  };

  return (
    <View style={styles.blobContainer}>
      <CheckBox
        style={{marginLeft: 10}}
        value={secondRoundselected}
        onPress={() => clickBox()}
      />
      <Image
        style={styles.profilePic}
        source={{
          uri: 'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp',
        }}
      />
      <View>
        <Text style={fontStyles.headerMedium}>
          {capitalize(name.split('@')[0])}
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
            userId: id,
            firstName: name,
            characteristics: characteristics,
            selectedProfile: {
              userId: id,
              selected: secondRoundselected,
            },
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
