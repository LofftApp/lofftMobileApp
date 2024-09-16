import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {size} from 'react-native-responsive-sizes';
// Redux 🏗️
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// Types 🏷️
import type {Advert} from 'reduxFeatures/adverts/types';

const FlatListSubScreen = () => {
  const {data: adverts, error, isLoading} = useGetAdvertsQuery();
  console.log('dataxxxxxxxxx>>>>>>', adverts);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatCardContainer}>
        <View>
          {adverts?.map((advert: Advert) => {
            return <ListViewFlatCard key={advert.id} advert={advert} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginHorizontal: size(16),
  },
});

export default FlatListSubScreen;
