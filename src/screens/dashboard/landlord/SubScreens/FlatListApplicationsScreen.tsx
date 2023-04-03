import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import ListViewFlatCard from '@Components/cards/ListViewFlatCard';
import ListFlatApplicationCard from '@Components/cards/ListFlatApplicationCard';

const FlatListApplicationsScreen = ({active, flats, navigation}: any) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
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
              address={el.address}
              description={el.description}
              fromDate={el.fromDate}
              untilDate={el.untilDate}
              /*  active is just for demo 👇*/
              active={active}
              posted={true}
              isLessor={true}
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
