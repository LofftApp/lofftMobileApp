import React from 'react';
import {ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';

// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({flats}) => {
  return (
    <ScrollView style={styles.pageContainer}>

      <SafeAreaView>
        {flats.map((el, index) => <ListViewFlatCard key={index+1} match={el.matchP} id={el.id} district={el.district} price={el.price}  />)}

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
