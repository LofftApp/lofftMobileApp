import React, {useState} from 'react';

import {View, Text, Image, StyleSheet, Pressable, Platform} from 'react-native';

// Screens
import ScreenBackButton from '../components/coreComponents/CoreScreens/ScreenBackButton';
// Styles
import {fontStyles} from '../styles/fontStyles';
import color from '../styles/lofftColorPallet.json';

// Components
import HeadlineContainer from '../components/containers/HeadlineContainer';
import IconButton from '../components/coreComponents/buttons/IconButton';

const StartJourney = ({navigation}) => {
  const [routeFlatHunt, setRouteFlatHunt] = useState(false);

  const handleClick = routeName => {
    setRouteFlatHunt(true);
    setTimeout(() => {
      console.log(routeName);
      navigation.navigate(routeName);
      setRouteFlatHunt(false);
    }, 500);
  };

  const subHeaderText =
    'Tell us what you want to do on Lofft and we will create the matching experience!';
  return (
    <ScreenBackButton nav={() => navigation.goBack()} title="Hello">
      <HeadlineContainer
        headlineText={'What brings you here?'}
        subDescription={subHeaderText}
      />
      <IconButton
        style={routeFlatHunt ? styles.buttonActive : styles.button}
        text="I'm looking for a flat"
        icon="search-outline"
        onPress={() => handleClick('AboutYouFlatHuntScreen')}
      />
      <IconButton
        text="I have a room to rent"
        icon="home-outline"
        onPress={() => {}}
      />
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: color.Black[100],
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonActive: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: color.Lavendar[100],
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.Lavendar[10],
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
});

export default StartJourney;
