import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView, Text} from 'react-native';
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

// FontStyles
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const FlatListSubScreen = ({
  filters,
  search,
  filterActivated,
}: AdvertFlatListSubSceenProps) => {
  const adverts = useAppSelector(
    (state: {adverts: AdvertState}) => state.adverts.adverts,
  );

  // Helper Function that handles filtering
  const filteredFlats = filterAdverts(
    adverts,
    filters,
    search,
    filterActivated,
  );

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatCardContainer}>
        <View>
          {filteredFlats.length > 0 ? (
            filteredFlats.map(advert => {
              return <ListViewFlatCard key={advert.id} advert={advert} />;
            })
          ) : (
            <View>
              <Text style={[fontStyles.headerLarge, {color: Color.Mint[80]}]}>
                Sorry, but we dont have anything at the moment that fits your
                critera😭
              </Text>
            </View>
          )}
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
