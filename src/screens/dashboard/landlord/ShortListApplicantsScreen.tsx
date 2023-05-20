import React, {useState} from 'react';

import {Text, View, StyleSheet} from 'react-native';

import userProfiles from '@Assets/mockTempData/userProfiles.json';
import ApplicantsCardAdvanced from '@Components/cards/ApplicantCardAdvanced';

import {useNavigation} from '@react-navigation/native';

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import BackButton from '@Components/buttons/BackButton';

const ShortListApplicantsScreen = ({navigation}) => {
  const [userProfilesJson, setUserProfilesJson] = useState(userProfiles.users);

  const selectProfile = id => {
    const updatedProfiles = userProfilesJson.map(el => {
      if (el.id === id) {
        return {
          ...el,
          selected: !el.selected,
        };
      } else {
        return el;
      }
    });

    setUserProfilesJson(updatedProfiles);
  };

  console.log(userProfilesJson);


  return (
    <View style={styles.container}>
      <BackButton
        style={styles.backButtonOptions}
        title="Applicants"
        onPress={() => navigation.goBack()}
      />
      {userProfilesJson.map((el, index) => (
        <ApplicantsCardAdvanced
          key={index + 1}
          name={el.name}
          match={el.match}
          image={el.image}
          id={el.id}
          selectProfile={selectProfile}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButtonOptions: {
    marginTop: 20,
  },
});

export default ShortListApplicantsScreen;
