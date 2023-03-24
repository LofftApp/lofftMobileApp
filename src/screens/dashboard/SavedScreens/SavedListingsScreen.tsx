import react from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// assets 🛠️
import {Looking} from './../../../assets';

const SavedListingsScreen = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerText}>
        <Text style={fontStyles.headerLarge}>Saved Listings</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Looking style={styles.image} />
        <Text style={fontStyles.headerMedium}>
          You don't have any saved listings
        </Text>
        <Text style={[fontStyles.bodyMedium, styles.subText]}>
          Find the saved listings that you've applied to in the saved listings
          tab.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    paddingHorizontal: 16,
    flex: 1,
  },
  headerText: {
    marginTop: 68,
    marginHorizontal: 16,
  },
  image: {
    height: '70%',
    overflow: 'visible',
    marginTop: 50,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
  },
  subText: {
    marginTop: 16,
    color: Color.Black[50],
  },
});

export default SavedListingsScreen;
