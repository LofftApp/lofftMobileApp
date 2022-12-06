import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import PrimaryScreen from '../components/coreComponents/CoreScreens/PrimaryScreen';
import Color from '../styles/lofftColorPallet.json';
import {fontStyles} from '../styles/fontStyles';
import IconButton from '../components/coreComponents/buttons/IconButton';
import BackgroundImage from '../assets/background/wbyh.svg';

const WelcomeScreen = ({navigation}) => {
  return (
    <PrimaryScreen navigation={navigation} background={true}>
      <BackgroundImage style={styles.backgroundImage} />
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
            icon="search-outline"
            onPress={() => {}}
          />
          <IconButton
            text="I have a room to rent"
            icon="home-outline"
            onPress={() => {}}
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
