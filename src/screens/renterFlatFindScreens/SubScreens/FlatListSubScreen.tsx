import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, TouchableOpacity , Text} from 'react-native';

// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.pageContainer}>
      <SafeAreaView>
        <ListViewFlatCard />
        <ListViewFlatCard />
        <TouchableOpacity onPress={() => navigation.navigate('TempScreen')}>
          <Text>Temp Screen</Text>
        </TouchableOpacity>
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
