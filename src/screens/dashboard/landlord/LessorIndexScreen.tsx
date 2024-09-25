import React from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native';

// Screens 📺
import FlatListComponent from '../renter/SubScreens/ListFlatApplicationComponent';

// Helpers 🧰
import {size} from 'react-native-responsive-sizes';

// Redux
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import * as Color from 'styleSheets/lofftColorPallet.json';

//Components
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';

// Assets
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Types

const LessorIndexScreen = () => {
  const {data: adverts, error, isLoading} = useGetAdvertsQuery();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message="There was an error getting your adverts" />;
  }

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewListContainer}>
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>My Listings</Text>
        <View style={styles.actionContainer}>
          <Pressable style={styles.addButton}>
            <LofftIcon
              name={'annotation-heart'}
              size={33}
              color={Color.Lavendar[100]}
            />
          </Pressable>
          <Pressable style={styles.addButton}>
            <LofftIcon name={'plus'} size={33} color={Color.Lavendar[100]} />
          </Pressable>
        </View>
      </View>

      <View style={CoreStyleSheet.screenContainer}>
        <FlatListComponent adverts={adverts} isLessor={true} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    paddingHorizontal: size(12),
    borderRadius: 12,
  },
  actionContainer: {
    flexDirection: 'row',
  },
});

export default LessorIndexScreen;
