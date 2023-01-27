import React from 'react';
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';

// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({flats, navigation}: any) => {
  return (
    <ScrollView style={styles.pageContainer}>
      <SafeAreaView>
        {flats.map((el: any, index: number) => (
          <ListViewFlatCard
            navigation={navigation}
            key={index + 1}
            match={el?.matchP}
            id={el.id}
            district={el.district}
            price={el.price}
            images={el.images}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 16,
  },
});

export default FlatListSubScreen;
