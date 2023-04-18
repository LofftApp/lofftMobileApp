import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import ListViewFlatCard from '@Components/cards/ListViewFlatCard';
import ListFlatApplicationCard from '@Components/cards/ListFlatApplicationCard';

const FlatListApplicationsScreen = ({
  active,
  adverts,
  navigation,
  isLessor,
}: any) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
      <SafeAreaView>
        {adverts.map((el: any, index: number) => {
          return (
            <ListFlatApplicationCard
              navigation={navigation}
              advert={el}
              key={index + 1}
              match={el?.matchP}
              flatId={el.flatId}
              district={el.district ? el.district : el.flat.district}
              price={el.price}
              images={el.images ? el.images : el.flat.images}
              likedUsers={el.likedUsers}
              address={el.address ? el.address : el.flat.address}
              description={
                el.description ? el.description : el.flat.description
              }
              fromDate={el.fromDate ? el.fromDate : el.flat.created_at}
              untilDate={el.untilDate}
              tagLine={el.tagLine}
              city={el.city ? el.city : el.flat.city}
              /*  active is just for demo 👇*/
              active={active}
              posted={true}
              isLessor={isLessor}
              lessorId={el.user ? el.user : null}
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
