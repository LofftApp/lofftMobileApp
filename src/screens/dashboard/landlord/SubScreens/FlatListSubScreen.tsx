import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// ! This is  a duplicat page, for landord and renter, refactor this to be one page

const FlatListSubScreen = () => {
  const flats = useAppSelector((state: any) => state.flats.allFlats);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
      <View>
        {flats.map((el: any, index: number) => {
          //TODO This has been updated to remove TS error, it will need to be refactored
          return <ListViewFlatCard key={index} advert={el} />;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginHorizontal: 16,
  },
});

export default FlatListSubScreen;
