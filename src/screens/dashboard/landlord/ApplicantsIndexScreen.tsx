import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// Firebase 🔥
import {getFlatsFromDB} from '@Api/firebase/firestoreActions';

// Screens 📺

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import BackButton from '@Components/buttons/BackButton';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';
import { CoreButton } from '@Components/buttons/CoreButton';

const ApplicantsIndexScreen = ({navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.applicantsHeight}>
        <BackButton title="Applicants" />
      </View>
      <ScrollView style={styles.scrollViewContainer}>
         {/* <ApplicantsListSubScreen /> */}
      </ScrollView>
      <View style={styles.selectedButton}>
        <CoreButton value="Confirm selected (add interpolation of selected boxes)" />
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
