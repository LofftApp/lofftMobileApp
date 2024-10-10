import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🧠

import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';

// Redux 🧠
import UserJourneyButton from 'components/buttons/UserJourneyButton';
import {setUserType} from 'reduxFeatures/registration/userJourneySlice';
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets
import {RegistrationBackground} from 'assets';

// Helper
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️
import {NewUserNavigatorProp} from '../../../navigationStacks/types';

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
    }, 400);
  };

  return (
    <>
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        <BackButton onPress={handleSignOut} />

        <RegistrationBackground
          height="100%"
          width="100%"
          style={styles.backgroundImage}
        />

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
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: size(100),
    gap: size(30),
  },
  backgroundContainer: {
    position: 'absolute',
    backgroundColor: Color.Lavendar[100],
    zIndex: -1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
    left: 0,
  },
});

export default NewUserJourneyScreen;
