import React from 'react';
import {FlatList, RefreshControl} from 'react-native';

//Redux
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components  🪢
import ListFlatApplicationCard from 'components/cards/ListFlatApplicationCard';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Types  🏷
import type {ListFlatApplicationComponentProps} from './types';
import {Application} from 'reduxFeatures/applications/types';
import {Advert} from 'reduxFeatures/adverts/types';
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';
import {useOnRefresh} from 'hooks/useOnRefresh';
import {useGetApplicationsQuery} from 'reduxFeatures/applications/applicationApi';

// if isLessor is true, then the list will be of adverts, otherwise it will be of applications
const ListFlatApplicationComponent = ({
  applications,
  adverts,
  isLoading,
  isError,
}: ListFlatApplicationComponentProps) => {
  const {data} = useGetUserQuery();
  const isLessor = data?.userType === 'lessor';
  const {refetch: refetchAdverts} = useGetAdvertsQuery(undefined);
  const {refetch: refetchApplications} = useGetApplicationsQuery(undefined);

  const {refreshing, onRefresh} = useOnRefresh(
    isLessor ? refetchAdverts : refetchApplications,
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return (
      <NotFoundComponent
        backButton
        message={
          isLessor
            ? 'There was an error getting your listings'
            : 'There was an error getting your applications'
        }
        buttonValue="Try again"
        onPress={() => {}}
      />
    );
  }
  if (
    (!applications || applications.length === 0) &&
    (!adverts || adverts.length === 0)
  ) {
    return <NotFoundComponent message="No applications found" />;
  }

  return isLessor ? (
    <FlatList
      data={adverts as Advert[]}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ListFlatApplicationCard _advert={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <FlatList
      data={applications as Application[]}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ListFlatApplicationCard application={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListFlatApplicationComponent;
