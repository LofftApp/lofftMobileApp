import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import ListViewFlatCard from '@Components/cards/ListViewFlatCard';
import ListFlatApplicationCard from '@Components/cards/ListFlatApplicationCard';

const FlatListApplicationsScreen = ({adverts, navigation, isLessor}: any) => {
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

export default FlatListApplicationsScreen;
