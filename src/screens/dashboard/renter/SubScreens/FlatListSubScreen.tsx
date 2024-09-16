import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// Types 🏷️
import type {Advert} from 'reduxFeatures/adverts/types';

const FlatListSubScreen = ({adverts}: {adverts: Advert[]}) => {
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
