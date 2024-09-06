import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';

// Components  🪢
import ListFlatApplicationCard from 'components/cards/ListFlatApplicationCard';

// Helpers 🧰
import {size} from 'react-native-responsive-sizes';

// Types  🏷
import type {FlatListComponentProps} from './types';

const FlatListComponent = ({adverts, isLessor}: FlatListComponentProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
      <SafeAreaView>
        {adverts.map((advert, index: number) => {
          return (
            <ListFlatApplicationCard
              key={index + 1}
              advert={advert}
              /*  active is just for demo 👇*/
              posted
              isLessor={advert.lessor}
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
});

export default FlatListComponent;
