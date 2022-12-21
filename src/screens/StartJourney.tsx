import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import IconButton from '@Components/buttons/IconButton';

// Styles 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

const StartJourney = ({navigation}: any) => {
  const [routeFlatHunt, setRouteFlatHunt] = useState('');

  const handleClick = (routeName: string, routeButton: string) => {
    setRouteFlatHunt(routeButton);
    setTimeout(() => {
      navigation.navigate(routeName);
      setRouteFlatHunt('');
    }, 500);
  };

  const subHeaderText =
    'Tell us what you want to do on Lofft and we will create the matching experience!';
  return (
    <ScreenBackButton nav={() => navigation.goBack()} title={undefined}>
      <HeadlineContainer
        headlineText={'What brings you here?'}
        subDescription={subHeaderText}
      />
      <IconButton
        style={
          routeFlatHunt === 'renting' ? styles.buttonActive : styles.button
        }
        text="I'm looking for a flat"
        icon="search-sm"
        onPress={() => handleClick('AboutYouFlatHuntScreen', 'renting')}
      />
      <IconButton
        text="I have a room to rent"
        icon="home-door"
        style={
          routeFlatHunt === 'leesing' ? styles.buttonActive : styles.button
        }
        onPress={() => handleClick('WhereIsFlatScreen', 'leesing')}
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
