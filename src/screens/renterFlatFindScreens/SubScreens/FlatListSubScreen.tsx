import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';

// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({flats, navigation}: any) => {
  return (
    <ScrollView>
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
            />
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
};

export default FlatListSubScreen;
