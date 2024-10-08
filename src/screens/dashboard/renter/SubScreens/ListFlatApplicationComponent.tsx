import React from 'react';
import {ScrollView} from 'react-native';

// Components  🪢
import ListFlatApplicationCard from 'components/cards/ListFlatApplicationCard';

// Types  🏷
import type {ListFlatApplicationComponentProps} from './types';
import {Application} from 'reduxFeatures/applications/types';
import {Advert} from 'reduxFeatures/adverts/types';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

// if isLessor is true, then the list will be of adverts, otherwise it will be of applications
const ListFlatApplicationComponent = ({
  applications,
  adverts,
  isLessor,
}: ListFlatApplicationComponentProps) => {
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
            isLessor={isLessor}
          />
        );
      })}
    </ScrollView>
  );
};

export default ListFlatApplicationComponent;
