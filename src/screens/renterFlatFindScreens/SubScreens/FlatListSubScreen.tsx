import React from 'react';
import {ScrollView, StyleSheet, SafeAreaView, Pressable} from 'react-native';

// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({flats, navigation}: any) => {
  return (
    <ScrollView style={styles.pageContainer}>
      <SafeAreaView>
        {flats.map((el: any, index: number) => {
          return (
            <Pressable
              onPress={() => navigation.navigate('flatProfile')}
              key={index}>
              <ListViewFlatCard
                navigation={navigation}
                match={el?.matchP}
                flatId={el.flatId}
                district={el.district}
                price={el.price}
                images={el.images}
                likedUsers={el.likedUsers}
              />
            </Pressable>
          );
        })}
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
