import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

const FlatListSubScreen = ({navigation}: any) => {
  // ! two adverts caused by how it is passed through, this should be investigated
  const adverts = useAppSelector((state: any) => state?.adverts?.adverts);
  console.log(adverts[0].flat.photos);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatCardContainer}>
        <View>
          {adverts.map((el: any, index: number) => {
            return (
              <ListViewFlatCard
                navigation={navigation}
                key={index + 1}
                matchScore={el.matchScore}
                flatId={el.flat.id}
                district={'Berlin, Moabit'}
                price={el.price}
                images={el.flat.photos}
                likedUsers={[]}
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
