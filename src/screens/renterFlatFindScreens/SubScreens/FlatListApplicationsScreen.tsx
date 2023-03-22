import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import ListViewFlatCard from '@Components/cards/ListViewFlatCard';
import ListFlatApplicationCard from '@Components/cards/ListFlatApplicationCard';

const FlatListApplicationsScreen = ({ active, flats, navigation }:any) => {
  return (
    <ScrollView style={styles.flatCardContainer}>
      <SafeAreaView>
        {flats.map((el: any, index: number) => {
          return (
            <ListFlatApplicationCard
              navigation={navigation}
              key={index + 1}
              match={el?.matchP}
              flatId={el.flatId}
              district={el.district}
              price={el.price}
              images={el.images}
              likedUsers={el.likedUsers}
              /*  active is just for demo 👇*/
              active={active}
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
