// ! Testing if required.
import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import ListFlatApplicationCard from '@Components/cards/ListFlatApplicationCard';

const FlatListComponent = ({adverts, isLessor, navigation}: any) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
      <SafeAreaView>
        {adverts.map((advert: any, index: number) => {
          return (
            <ListFlatApplicationCard
              navigation={navigation}
              key={index + 1}
              advert={advert}
              /*  active is just for demo 👇*/
              posted={true}
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
    marginHorizontal: 16,
  },
});

export default FlatListComponent;
