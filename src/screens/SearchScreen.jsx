import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import ScreenBackButton from '../components/coreComponents/CoreScreens/ScreenBackButton';
{
  /* <ScreenBackButton nav={() => navigation.goBack()}></ScreenBackButton> */
}

const SearchScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchOverlay}></View>
      <View style={styles.viewTabs}></View>
      <View style={styles.listView}></View>
      <View style={styles.tabBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'red',
    flex: 1,
    backgroundColor: 'grey',
    marginTop: 60,
  },
  searchOverlay: {
    borderWidth: 2,
    borderColor: 'red',
    paddingHorizontal: 16,
    height: 64,
    paddingVertical: 8,
  },
  viewTabs: {
    borderWidth: 2,
    borderColor: 'red',
    paddingHorizontal: 16,
    height: 54,
  },
  listView: {
    borderWidth: 2,
    borderColor: 'red',
    flex: 1,
    paddingHorizontal: 16,
  },
  tabBar: {
    borderWidth: 2,
    borderColor: 'red',
    paddingHorizontal: 16,
    height: 84,
  },
});

export default SearchScreen;
