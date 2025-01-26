import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// assets 🛠️
import {Looking} from '../../../assets';
import {useGetFavoritesAdvertsQuery} from 'reduxFeatures/adverts/advertApi';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import FavoritesSubScreen from './SubScreens/FavoritesSubScreen';

const FavoritesScreen = () => {
  const {data, isLoading, isError} = useGetFavoritesAdvertsQuery();
  const favorites = data?.favorites;
  console.log('Favorites>>>>>>>>>>>>', favorites);
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewListContainer}>
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>Saved Listings</Text>
      </View>
      <View style={CoreStyleSheet.screenContainer}>
        <FavoritesSubScreen
          favorites={favorites ?? []}
          isLoading={isLoading}
          isError={isError}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    paddingHorizontal: 16,
    flex: 1,
  },
  headerText: {
    marginTop: 68,
    marginHorizontal: 16,
  },
  image: {
    height: '70%',
    overflow: 'visible',
    marginTop: 50,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
  },
  subText: {
    marginTop: 16,
    color: Color.Black[50],
  },
});

export default FavoritesScreen;
