import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import { width, height, size, fontSize } from "react-native-responsive-sizes";
// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import ListViewFlatCard from 'components/cards/ListViewFlatCard';

const FlatListSubScreen = ({navigation}: any) => {
  const adverts = useAppSelector((state: any) => state?.adverts?.adverts);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatCardContainer}>
        <View>
          {adverts.map((advert: any, index: number) => {
            return (
              <ListViewFlatCard
                navigation={navigation}
                key={index + 1}
                i={index}
                advert={advert}
                id={advert.id}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginHorizontal: size(16),
  },
});

export default FlatListSubScreen;
