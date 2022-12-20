import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Screens 📺
import PrimaryScreen from '@Screens/PrimaryScreen';

// Components 🪢
import IconButton from '@Components/buttons/IconButton';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

const WelcomeScreen = ({navigation}: any) => {
  return (
    <PrimaryScreen background={true}>
      <View style={styles.pageContainer}>
        <Text style={[fontStyles.headerDisplay, styles.header]}>
          What brings you here?
        </Text>
        <Text style={[fontStyles.bodySmall, styles.textColor]}>
          Tell us what you want to do on Lofft and we will create the matching
          experience!
        </Text>
        <View style={styles.buttonContainer}>
          <IconButton
            text="I'm looking for a flat"
            // iconName="search-sm"
            icon="eye"
            onPress={() => navigation.navigate('AboutYouFlatHuntScreen')}
            style={undefined}
          />
          <IconButton
            text="I have a room to rent"
            icon={'home-door'}
            onPress={() => {}}
            style={undefined}
          />
        </View>
      </View>
    </PrimaryScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 135,
  },
  textColor: {
    color: Color.Black[80],
    marginTop: 15,
  },
  backgroundImage: {
    marginTop: 45,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  pageContainer: {
    paddingHorizontal: 15,
  },
  buttonContainer: {
    marginTop: 44,
  },
});

export default WelcomeScreen;
