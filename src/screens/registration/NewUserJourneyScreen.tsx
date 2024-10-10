import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🧠

import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';

// Redux 🧠
import UserJourneyButton from 'reduxFeatures/registration/UserJourneyButton';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Helper
import {size} from 'react-native-responsive-sizes';
import {NewUserNavigatorProp} from '../../../navigationStacks/types';

const StartJourney = () => {
  const [signOut] = useSignOutMutation();
  const navigation = useNavigation<NewUserNavigatorProp>();

  const renterText = {
    headerText: 'What language(s) do you speak?',
  };

  const lessorText = {
    headerText: 'What are the common languages in your Lofft?',
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <ScreenBackButton nav={handleSignOut}>
      <HeadlineContainer
        headlineText={'What brings you here?'}
        subDescription={
          'Tell us what you want to do on Lofft and we will create the matching experience!'
        }
      />
      <UserJourneyButton
        text="I'm looking for a flat"
        icon="search-sm"
        style={styles.button}
        onPress={() => {
          navigation.navigate('LanguageSelectionScreen', [
            renterText.headerText,
            'renter',
          ]);
        }}
        type="renter"
      />
      <UserJourneyButton
        text="I have a room to rent"
        icon="home-door"
        style={styles.button}
        onPress={() => {
          navigation.navigate('LanguageSelectionScreen', [
            lessorText.headerText,
            'lessor',
          ]);
        }}
        type="lesser"
      />
    </ScreenBackButton>
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
  icon: {
    width: size(40),
    height: size(40),
    marginRight: size(8),
  },
});

export default StartJourney;
