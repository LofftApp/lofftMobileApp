import React from 'react';
import {ScrollView} from 'react-native';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// Types 🏷️
import type {Advert} from 'reduxFeatures/adverts/types';

const FlatListSubScreen = ({adverts}: {adverts: Advert[]}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {adverts?.map((advert: Advert) => {
        return <ListViewFlatCard key={advert.id} advert={advert} />;
      })}
    </ScrollView>
  );
};

export default FlatListSubScreen;
