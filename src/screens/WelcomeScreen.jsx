import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PrimaryScreen from '../components/coreComponents/CoreScreens/PrimaryScreen';
import Color from '../styles/lofftColorPallet.json';
import {fontStyles} from '../styles/fontStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import IconButton from '../components/coreComponents/buttons/IconButton';

const WelcomeScreen = ({navigation}) => {
  return (
    <PrimaryScreen navigation={navigation}>
      <Text style={[fontStyles.headerDisplay, styles.header]}>
        What brings you here?
      </Text>
      <Text style={[fontStyles.bodySmall, styles.textColor]}>
        Tell us what you want to do on Lofft and we will create the matching
        experience!
      </Text>
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
    </PrimaryScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 120,
  },
  textColor: {
    color: Color.Black[80],
    marginTop: 15,
  },
});

export default WelcomeScreen;
