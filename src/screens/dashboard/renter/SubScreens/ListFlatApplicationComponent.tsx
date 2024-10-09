import React from 'react';
import {ScrollView} from 'react-native';

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

// if isLessor is true, then the list will be of adverts, otherwise it will be of applications
const ListFlatApplicationComponent = ({
  applications,
  adverts,
  isLoading,
  isError,
}: ListFlatApplicationComponentProps) => {
  const {data} = useGetUserQuery();
  const isLessor = data?.user?.userType === 'lessor';

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
      />
    );
  }
  if (
    (!applications || applications.length === 0) &&
    (!adverts || adverts.length === 0)
  ) {
    return <NotFoundComponent message="No applications found" />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {(isLessor ? adverts : applications)?.map(el => {
        return (
          <ListFlatApplicationCard
            key={el.id}
            application={el as Application}
            _advert={isLessor ? (el as Advert) : undefined}
          />
        );
      })}
    </ScrollView>
  );
};

export default ListFlatApplicationComponent;
