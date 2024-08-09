import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import {size} from 'react-native-responsive-sizes';
// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// Types 🏷️
import type {AdvertState} from 'reduxFeatures/adverts/types';
import {AdvertFlatListSubSceenProps} from './types';

// Helpers 🥷🏻
import {filterAdverts} from 'helpers/filterAdverts';

const FlatListSubScreen = ({filters, search}: AdvertFlatListSubSceenProps) => {
  const adverts = useAppSelector(
    (state: {adverts: AdvertState}) => state.adverts.adverts,
  );

  // Helper Function that handles filtering
  const filteredFlats = filterAdverts(adverts, filters, search);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatCardContainer}>
        <View>
          {filteredFlats.map(advert => {
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
