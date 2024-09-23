import React from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native';

// Screens 📺
import FlatListComponent from '../renter/SubScreens/ListFlatApplicationComponent';

// Helpers 🧰
import {size} from 'react-native-responsive-sizes';

// Redux

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import * as Color from 'styleSheets/lofftColorPallet.json';

// Assets
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Types
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';

const LessorIndexScreen = () => {
  const {data: adverts, error, isLoading} = useGetAdvertsQuery();

  if (isLoading) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView style={styles.loadingErrorContainer}>
          <Text style={fontStyles.headerSmall}>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView style={styles.loadingErrorContainer}>
          <Text style={fontStyles.headerSmall}>
            There was an error getting your adverts
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerText}>
        <Text style={fontStyles.headerLarge}>My Listings</Text>
        <View style={styles.actionContainer}>
          <Pressable style={[styles.addButton, styles.marginRight15]}>
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

      <View style={styles.viewContainer}>
        <FlatListComponent adverts={adverts} isLessor={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    marginVertical: size(15),
    position: 'relative',
  },
  inputField: {
    flex: 1,
  },

  headerText: {
    marginTop: size(70),
    marginHorizontal: size(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    paddingVertical: size(7),
    paddingHorizontal: size(12),
    borderRadius: size(12),
  },
  actionContainer: {
    flexDirection: 'row',
  },
  loadingErrorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginRight15: {
    marginRight: size(15),
  },
});

export default LessorIndexScreen;
