import React from 'react';
import {ScrollView} from 'react-native';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Types 🏷️
import type {Advert} from 'reduxFeatures/adverts/types';
import {FlatListSubScreenProps} from './types';

const FlatListSubScreen = ({
  adverts,
  isError,
  isLoading,
}: FlatListSubScreenProps) => {
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    return <NotFoundComponent message="There was an error getting flats" />;
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {adverts?.map((advert: Advert) => {
        return <ListViewFlatCard key={advert.id} advert={advert} />;
      })}
    </ScrollView>
  );
};

export default FlatListSubScreen;
