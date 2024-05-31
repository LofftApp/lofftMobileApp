import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import {size} from 'react-native-responsive-sizes';
// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// Types 🏷️
import type {FlatListSubScreenProps} from './types';
import type {AdvertState} from 'reduxFeatures/adverts/types';

const FlatListSubScreen = ({navigation}: FlatListSubScreenProps) => {
  const adverts = useAppSelector(
    (state: {adverts: AdvertState}) => state.adverts.adverts,
  );
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatCardContainer}>
        <View>
          {adverts.map((advert, index) => {
            return (
              <ListViewFlatCard
                navigation={navigation}
                key={index + 1}
                i={index}
                advert={advert}
                id={advert.id}
              />
            );
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
