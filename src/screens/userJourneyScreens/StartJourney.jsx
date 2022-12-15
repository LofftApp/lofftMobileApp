import React, {useState} from 'react';

import {StyleSheet} from 'react-native';

// Screens
import ScreenBackButton from '../../components/coreComponents/CoreScreens/ScreenBackButton';
// Styles
import color from '../../styles/lofftColorPallet.json';

// Components
import HeadlineContainer from '../../components/containers/HeadlineContainer';
import IconButton from '../../components/coreComponents/buttons/IconButton';

const StartJourney = ({navigation}) => {
  const [routeFlatHunt, setRouteFlatHunt] = useState(null);

  const handleClick = (routeName, type) => {
    setRouteFlatHunt(type);
    setTimeout(() => {
      navigation.navigate(routeName);
      setRouteFlatHunt(null);
    }, 500);
  };

  const subHeaderText =
    'Tell us what you want to do on Lofft and we will create the matching experience!';
  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={'What brings you here?'}
        subDescription={subHeaderText}
      />
      <IconButton
        style={[
          styles.button,
          routeFlatHunt === 'renter' ? styles.buttonActive : null,
        ]}
        text="I'm looking for a flat"
        icon="search-outline"
        onPress={() => handleClick('AboutYouFlatHuntScreen', 'renter')}
      />
      <IconButton
        style={[
          styles.button,
          routeFlatHunt === 'lesser' ? styles.buttonActive : null,
        ]}
        text="I have a room to rent"
        icon="home-outline"
        onPress={() => handleClick('WhereIsFlatScreen', 'lesser')}
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
    borderColor: color.Lavendar[100],
    backgroundColor: color.Lavendar[10],
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
});

export default StartJourney;
