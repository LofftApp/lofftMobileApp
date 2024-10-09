import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';

// import ListViewFlatCard from 'components/cards/ListViewFlatCard';
import ListFlatApplicationCard from 'components/cards/ListFlatApplicationCard';

const FlatListComponent = ({flats}: any) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
      <SafeAreaView>
        {flats.map((el: any, index: number) => {
          return (
            //TODO This has been updated to remove TS error, it will need to be refactored
            <ListFlatApplicationCard key={index} _advert={el} isLessor={true} />
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
