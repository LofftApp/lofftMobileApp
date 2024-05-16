import React from 'react';
import {StyleSheet} from 'react-native';

// Redux 🧠
import {useDispatch} from 'react-redux';
import {signOut} from '@Redux/authentication/authenticationMiddleware';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import IconButton from 'components/buttons/IconButton';

// Redux 🧠
import UserJourneyButton from '@Redux/registration/UserJourneyButton';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

const StartJourney = ({navigation}: any) => {
  const dispatch = useDispatch();

  const renterText = {
    headerText: 'What language(s) do you speak?',
  };

  const lessorText = {
    headerText: 'What are the common languages in your Lofft?',
  };

  return (
    <ScreenBackButton nav={() => dispatch(signOut())} title={undefined}>
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
            renterText,
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
            lessorText,
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
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Color.Black[100],
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonActive: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Color.Lavendar[100],
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Lavendar[10],
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
});

export default StartJourney;
