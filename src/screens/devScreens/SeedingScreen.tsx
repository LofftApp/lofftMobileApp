import React from 'react';
import {StyleSheet} from 'react-native';

// Firebase
import auth from '@react-native-firebase/auth';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Redux 🧠
import UserJourneyButton from '@Redux/userRegistration/UserJourneyButton';

const SeedingScreen = ({navigation}: any) => {
  return (
    <ScreenBackButton
      nav={() => auth().signOut()}
      title={'Seed Screen'}></ScreenBackButton>
  );
};

const styles = StyleSheet.create({});

export default SeedingScreen;
