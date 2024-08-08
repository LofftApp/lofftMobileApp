import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import {size} from 'react-native-responsive-sizes';
// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// Types 🏷️
import type {AdvertState} from 'reduxFeatures/adverts/types';

const FlatListSubScreen = filters => {
  const adverts = useAppSelector(
    (state: {adverts: AdvertState}) => state.adverts.adverts,
  );

  const {advertChars, maxPrice, minPrice} = filters.filters;
  const advertParams = advertChars[0].map(el => el.value);

  let filteredFlats = adverts;

  // Apply feature-based filtering if advertParams is not empty
  if (advertParams.length > 0) {
    filteredFlats = filteredFlats.filter(advert =>
      advert.flat.features?.some(feature =>
        advertParams.includes(feature.name),
      ),
    );
  } else {
    console.log('Hi I am here');
  }

  // Always apply the price-based filtering
  filteredFlats = filteredFlats.filter(
    el => el.price >= minPrice && el.price <= maxPrice,
  );

  useAppSelector(state => console.log(state.adverts));

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
