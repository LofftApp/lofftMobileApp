import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import {size} from 'react-native-responsive-sizes';
// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// Types 🏷️
import type {AdvertState} from 'reduxFeatures/adverts/types';
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';

const FlatListSubScreen = () => {
  const adverts = useAppSelector(
    (state: {adverts: AdvertState}) => state.adverts.adverts,
  );
  // const {data: advertsData, error, isLoading} = useGetAdvertsQuery();
  // console.log('dataxxxxxxxxx', advertsData?.adverts);
  // const adverts = advertsData?.adverts;
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatCardContainer}>
        <View>
          {adverts.map(advert => {
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
