import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// Firebase 🔥
import {getFlatsFromDB} from '@Api/firebase/firestoreActions';

// Screens 📺
import ApplicantsListSubScreen from './SubScreens/ApplicantsListSubScreen';

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import BackButton from '@Components/buttons/BackButton';
import CompleteProfileImage from '@Assets/images/Illustration.png';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';
import {CoreButton} from '@Components/buttons/CoreButton';

const ApplicantsIndexScreen = ({navigation}: any) => {
  const lessorObject = {
    header:
      'Are you sure you want to confirm this list of selected applicants?',
    description1:
      'Once confirmed, you cannot select any more applicants or change the decision',
    description2: '⚡️ You can still select 19 more applicants',
    button1: 'Confirm selection(1)',
    button2: 'Back to applicants list',
    icon: CompleteProfileImage,
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.applicantsHeight}>
        <BackButton title="Applicants" />
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <ApplicantsListSubScreen />
      </ScrollView>
      <View style={styles.selectedButton}>
        <CoreButton
          value="Confirm selected (add interpolation of selected boxes)"
          disabled={false}
          onPress={() =>
            navigation.navigate('applyforflat', {lessorObject: lessorObject})
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 72,
    paddingBottom: 16,
    flex: 1,
    backgroundColor: Color.White[100],
  },
  applicantsHeight: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    paddingVertical: 10,
  },
  selectedButton: {
    paddingHorizontal: 16,
  },
});

export default ApplicantsIndexScreen;
