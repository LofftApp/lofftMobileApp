import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Types 🏷️
import type {Advert, Favorite} from 'reduxFeatures/adverts/types';
import {FavoritesSubScreenProps} from './types';
import {Looking} from 'assets';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import FavoriteViewFlatCard from 'components/cards/FavoriteViewFlatCard';

const FavoritesSubScreen = ({
  favorites,
  isError,
  isLoading,
}: FavoritesSubScreenProps) => {
  const isAllFavoritesApplied = favorites?.every(favorite => favorite.applied);

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    return (
      <NotFoundComponent message="There was an error getting favorites flats" />
    );
  }
  if (favorites?.length === 0 || isAllFavoritesApplied) {
    return (
      <View style={styles.bodyContainer}>
        <Looking style={styles.image} />
        <Text style={fontStyles.headerMedium}>
          You don't have any saved listings
        </Text>
        <Text style={[fontStyles.bodyMedium, styles.subText]}>
          Find the saved listings that you've applied to in the applications
          tab.
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={favorites || []}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <FavoriteViewFlatCard favorite={item} />}
      showsVerticalScrollIndicator={false}
    />
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

export default FavoritesSubScreen;
