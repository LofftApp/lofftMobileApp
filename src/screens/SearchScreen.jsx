import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import ScreenBackButton from '../components/coreComponents/CoreScreens/ScreenBackButton';

const SearchScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScreenBackButton nav={() => navigation.goBack()}></ScreenBackButton>
      <Text>This is Search screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchScreen;
