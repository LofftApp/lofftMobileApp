import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loadUserFlats} from './flatHandlingSlice';
import {loadFlats} from './loadFlats';
// Helo
// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const flats = useSelector((state: any) => console.log(state.flatDetails));
  useEffect(() => {
    const getSavedFlats = async () => {
      dispatch(loadUserFlats());
    };
    getSavedFlats();
  }, [dispatch]);
  return (
    <ScrollView
      style={styles.pageContainer}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        {/* {flats.map((el: any, index: number) => {
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
        })} */}
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
