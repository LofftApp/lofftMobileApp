import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🧠

import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';

// Redux 🧠
import UserJourneyButton from 'components/buttons/UserJourneyButton';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Helper
import {size} from 'react-native-responsive-sizes';
import {NewUserNavigatorProp} from '../../../navigationStacks/types';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import BackButton from 'components/buttons/BackButton';
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {setUserType} from 'reduxFeatures/registration/userJourneySlice';

const NewUserJourneyScreen = () => {
  const dispatch = useAppDispatch();

  const [signOut] = useSignOutMutation();
  const navigation = useNavigation<NewUserNavigatorProp>();
  const userType = useAppSelector(state => state.userDetails.userType);
  console.log('userType in startJounet', userType);

  const renterText = {
    headerText: 'What language(s) do you speak?',
  };

  const lessorText = {
    headerText: 'What are the common languages in your Lofft?',
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleSelected = (type: string) => {
    dispatch(setUserType(type));
    setTimeout(() => {
      if (type === 'renter') {
        navigation.navigate('LanguageSelectionScreen', [
          renterText.headerText,
          'renter',
        ]);
      } else {
        navigation.navigate('LanguageSelectionScreen', [
          lessorText.headerText,
          'lessor',
        ]);
      }
    }, 600);
  };

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleSignOut} />
      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.mainContainer}>
          <HeadlineContainer
            headlineText={'What brings you here?'}
            subDescription={
              'Tell us what you want to do on Lofft and we will create the matching experience!'
            }
          />
          <UserJourneyButton
            text="I'm looking for a flat"
            icon="search-sm"
            onPress={() => handleSelected('renter')}
            type="renter"
            isActive={userType === 'renter'}
          />
          <UserJourneyButton
            text="I have a room to rent"
            icon="home-door"
            onPress={() => handleSelected('lessor')}
            type="lessor"
            isActive={userType === 'lessor'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: size(12),
    borderWidth: size(2),
    borderColor: Color.Black[100],
    marginBottom: size(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonActive: {
    borderRadius: size(12),
    borderWidth: size(2),
    borderColor: Color.Lavendar[100],
    marginBottom: size(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Lavendar[10],
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: size(30),
  },
});

export default NewUserJourneyScreen;
