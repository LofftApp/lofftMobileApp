import React, {useState} from 'react';

import {Text, View, StyleSheet} from 'react-native';

import userProfiles from '@Assets/mockTempData/userProfiles.json';
import ApplicantsCardAdvanced from '@Components/cards/ApplicantCardAdvanced';

import {useNavigation} from '@react-navigation/native';

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import BackButton from '@Components/buttons/BackButton';



const ShortListApplicantsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BackButton
        style={styles.backButtonOptions}
        title="Applicants"
        onPress={() => navigation.goBack()}
      />
      {userProfiles.users.map((el, index) => (
        <ApplicantsCardAdvanced
          key={index + 1}
          name={el.name}
          match={el.match}
          image={el.image}
          id
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
