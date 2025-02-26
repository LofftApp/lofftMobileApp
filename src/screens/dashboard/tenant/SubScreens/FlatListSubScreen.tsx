import React from 'react';
import {FlatList, RefreshControl} from 'react-native';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Types 🏷️
import type {Advert} from 'reduxFeatures/adverts/types';
import {FlatListSubScreenProps} from './types';
import {useOnRefresh} from 'hooks/useOnRefresh';

const FlatListSubScreen = ({
  adverts,
  isError,
  isLoading,
  toggleModal,
  refetch,
}: FlatListSubScreenProps) => {
  const {refreshing, onRefresh} = useOnRefresh(refetch);
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    return <NotFoundComponent message="There was an error getting flats" />;
  }
  if (adverts?.length === 0) {
    return (
      <NotFoundComponent
        buttonValue="New search"
        onPress={toggleModal}
        message="No flats found"
      />
    );
  }

  return (
    <FlatList
      data={adverts as Advert[]}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ListViewFlatCard advert={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FlatListSubScreen;
