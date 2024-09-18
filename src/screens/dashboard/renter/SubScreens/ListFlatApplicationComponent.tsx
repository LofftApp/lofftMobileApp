import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';

// Components  🪢
import ListFlatApplicationCard from 'components/cards/ListFlatApplicationCard';
import {fontStyles} from 'styleSheets/fontStyles';

// Helpers 🧰
import {size} from 'react-native-responsive-sizes';

// Types  🏷
import type {ListFlatApplicationComponentProps} from './types';
import {Application} from 'reduxFeatures/applications/types';
import {Advert} from 'reduxFeatures/adverts/types';

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
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={fontStyles.headerSmall}>{'No applications found'}</Text>
      </SafeAreaView>
    );
  }
  console.log('applications IN LIST', applications);
  console.log('adverts IN LIST', adverts);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
      <SafeAreaView>
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
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginHorizontal: size(16),
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListFlatApplicationComponent;
