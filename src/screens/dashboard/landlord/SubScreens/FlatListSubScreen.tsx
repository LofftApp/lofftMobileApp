import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

// ! This is  a duplicat page, for landord and renter, refactor this to be one page

const FlatListSubScreen = ({navigation}: any) => {
  const flats = useAppSelector((state: any) => state.flats.allFlats);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
      <View>
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
