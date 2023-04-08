import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({navigation}: any) => {
  const adverts = useAppSelector((state: any) => state?.adverts?.adverts);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatCardContainer}>
        <View>
          {adverts.map((el: any, index: number) => {
            return (
              <ListViewFlatCard
                id={el.id}
                navigation={navigation}
                key={index + 1}
                matchScore={el.matchScore}
                flatId={el.flat.id}
                district={el.flat.district}
                price={el.price}
                images={el.flat.photos}
                favorite={el.favorite}
                i={index}
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
    marginHorizontal: 16,
  },
});

export default FlatListSubScreen;
