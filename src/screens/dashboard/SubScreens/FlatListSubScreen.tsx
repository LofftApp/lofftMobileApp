import React from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({navigation}: any) => {
  const flats = useAppSelector((state: any) => state.flats.allFlats);
  return (
    <ScrollView style={styles.flatCardContainer}>
      <SafeAreaView>
        {flats.map((el: any, index: number) => {
          return (
            <ListViewFlatCard
              navigation={navigation}
              key={index + 1}
              match={el?.matchP}
              flatId={el.flatId}
              district={el.district}
              price={el.price}
              images={el.images}
              likedUsers={el.likedUsers}
              i={index}
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

export default FlatListSubScreen;
