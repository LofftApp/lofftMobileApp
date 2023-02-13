import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Firebase 🔥
import auth from '@react-native-firebase/auth';
import {getFlatsFromDB} from '@Api/firebase/firestoreActions';

// Screens 📺
import FlatListSubScreen from './SubScreens/FlatListSubScreen';

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import FlatMap from '@Components/Maps/FlatMap';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

const FlatListScreen = ({navigation}: any) => {
  const [sortedFlats, setSortedFlats] = useState([]);

  useEffect(() => {
    const getFlats = async () => {
      const flats = await getFlatsFromDB();
      if (flats) {
        if (flats[0]?.matchP) {
          const reOrder = flats.sort((a: any, b: any) => b.matchP - a.matchP);
          setSortedFlats(reOrder);
        } else {
          setSortedFlats(flats);
        }
      }
    };
    getFlats();
  }, []);

  const [search, setSearch] = useState('');
  const [screen, setScreen] = useState('list');
  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchContainer}>
        <InputFieldText
          type="search"
          onChangeText={(t: string) => setSearch(t)}
          value={search}
          placeholder="City, Neighbourhood..."
          onClear={() => setSearch('')}
          keyboardType="email-address"
          style={styles.inputField}
        />
        <FilterButton onPress={() => auth().signOut()} />
      </View>
      <View style={styles.viewToggle}>
        <Pressable
          style={[
            styles.toggleButton,
            screen === 'map' ? styles.toggleButtonActive : null,
          ]}
          onPress={() => setScreen('map')}>
          <LofftIcon
            name="map"
            size={20}
            color={screen === 'map' ? Color.White[100] : Color.Lavendar[100]}
          />
          <Text
            style={[
              fontStyles.bodyMedium,
              styles.toggleButtonText,
              screen === 'map' ? styles.toggleButtonTextActive : null,
            ]}>
            Map View
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.toggleButton,
            screen === 'list' ? styles.toggleButtonActive : null,
          ]}
          onPress={() => setScreen('list')}>
          <LofftIcon
            name="list"
            size={20}
            color={screen === 'list' ? Color.White[100] : Color.Lavendar[100]}
          />
          <Text
            style={[
              fontStyles.bodyMedium,
              styles.toggleButtonText,
              screen === 'list' ? styles.toggleButtonTextActive : null,
            ]}>
            List View
          </Text>
        </Pressable>
      </View>
      <View style={styles.viewContainer}>
        {screen === 'list' ? (
          <FlatListSubScreen flats={sortedFlats} navigation={navigation} />
        ) : (
          <FlatMap flats={sortedFlats} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
    paddingHorizontal: 16,
  },
  viewContainer: {
    flex: 1,
  },
  inputField: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 68, // Needs to be added to core view file, though not working when built
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: Color.Lavendar[100],
    borderWidth: 2,
    borderRadius: 12,
    marginTop: 8,
    height: 40,
    marginBottom: 8,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: Color.Lavendar[100],
  },
  toggleButtonText: {
    marginLeft: 5,
    color: Color.Lavendar[100],
  },
  toggleButtonTextActive: {
    color: Color.White[100],
  },
});

export default FlatListScreen;
